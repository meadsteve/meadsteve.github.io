---
layout: post
published: true
title:  "Making python fast for free - adventures with mypyc"
date:   2022-09-27 10:00:00
categories: programming
summary: "Attempting to speed up a library without changing the code using mypyc"
icon: fab fa-python
tags:
    - compilation
    - python
    - mypy
    - types
    - libraries
comments:
  title: Discuss this post over on reddit
  link: https://www.reddit.com/r/Python/comments/xpamlp/making_python_fast_for_free_adventures_with_mypyc/
  extras:
    - title: or on hacker news
      link: https://news.ycombinator.com/item?id=32994584
---

I recently learnt that mypy has a compiler called [mypyc](https://github.com/mypyc/mypyc). The compiler uses standard
python type hints to generate c extensions automatically from python code. I found the idea very interesting as
I have a library ([Lagom](https://lagom-di.readthedocs.io/en/stable/) - a dependency injection container) which is fairly extensively annotated with types. I liked the idea of getting a performance boost without having to 
rewrite any code or having to deal with multiple languages. This blogpost is intended to be a short overview of what
I did, the problems I ran into and the workflow I ended up with.

(Note: [Cython](https://cython.readthedocs.io/) has a similar target usage but often requires a few more code changes)

## Attempting to compile the whole thing

For my first attempt at using mypyc I attempted to compile my entire library. This failed. The main issue was 
[mypyc issue 864 - no nested class definitions](https://github.com/mypyc/mypyc/issues/864). This was almost where
I stopped. The idea was I shouldn't need to make changes and fixing this would have been a big change.

## Picking core modules
I took a step back and realised that I would get most of the benefit from compilation if the most executed code in my 
library was compiled even if this was not 100% of the code. I thought about my code and realised I had 3 or 4 modules
that do most of the heavy lifting of the library. Luckily mypyc has catered for this and has a function you can
call from `setup.py` to specify which files need compilation. So I ended up with something like this:

```python
    from mypyc.build import mypycify
    setup(
        version=load_version("lagom/version.py"),
        ext_modules=mypycify([
            'lagom/container.py',
            'lagom/context_based.py',
            'lagom/definitions.py',
            'lagom/updaters.py',
        ])
    )
```

## Losing flit and adding a build step

The next big shock was that I now had a build step. Up until now I'd been using [flit](https://flit.pypa.io/) to push 
my package to pypi. Flit has been great for just getting out of the way. It was easy to set up and required very
little code or configuration. It does come with one downside though (taken from the docs):

> If your package needs a build step, you won’t be able to use Flit.

So I had to spend a few hours reworking my package for publication using setuptools. Although this is the de-facto 
standard it's something I've always struggled with. But I got it working, and now I had a build step.

## Building the wheels on CI
Rather than requiring everyone to compile the code as part of installing the library I wanted to push some pre-built
wheels to pypi. The [cibuildwheel](https://github.com/pypa/cibuildwheel) is perfect for this. I was already using
github actions so with a little work I had this job building wheels across versions for windows, mac and linux:

```yaml
{% raw %}
jobs:
  mac-and-windows-and-linux-publish:
    runs-on: ${{ matrix.builds.os }}
    strategy:
      fail-fast: false
      matrix:
        builds: [
          {os: "macOS-latest", python_requires: ">=3.7.0"},
          {os: "windows-latest", python_requires: ">=3.7.0"},
          {os: "ubuntu-latest", python_requires: ">=3.7.0,<3.11.0"}
        ]
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: 3.8
      - name: Install deps
        run: python -m pip install cibuildwheel==2.9.0 twine==4.0.1
      - name: Build wheels
        env:
          CIBW_PROJECT_REQUIRES_PYTHON: ${{ matrix.builds.python_requires }}
          CIBW_BUILD: "cp3*"
        run: python -m cibuildwheel --output-dir wheelhouse
      - name: Publish
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_TOKEN }}
        run: |
          twine upload --skip-existing wheelhouse/*
{% endraw %}
```

I limited cibuildwheel to cpython only with a `CIBW_BUILD` set to `cp3*` and each OS has the python 
version range specified (at the time of writing I had some problems building for linux with 3.11). I also added
a final step to use twine to publish these versions. Since this job is scheduled to run when a commit is tagged
I now had an automated publishing workflow triggered entirely by git.

## Building a generic wheel for unsupported platforms
I wanted to keep support in my library for platforms where the code could not be compiled, so I decided to have a 
final build step that publishes a pure python wheel without any compiled code. I modified my `setup.py` file to toggle
the compilation step based on an environment variable.

```python
if not bool(int(os.getenv('LAGOM_SKIP_COMPILE', '0'))):
    from mypyc.build import mypycify
    # ... compiled build
else:
    # This branch doesn't use mypyc compilation
    setup(
        version=load_version("lagom/version.py")
    )
```

and then an extra job in the github action:

```yaml
{% raw %}
 pure-python-wheel-publish:
   runs-on: ubuntu-latest
   steps:
     - uses: actions/checkout@v2
     - name: Set up Python ${{ matrix.python-version }}
       uses: actions/setup-python@v2
       with:
         python-version: 3.8
     - name: Install deps
       run: python -m pip install wheel==0.37.1  twine==4.0.1
     - name: Build pure python wheel
       env:
         LAGOM_SKIP_COMPILE: "1"
       run: pip wheel -w wheelhouse .
     - name: Publish
       env:
         TWINE_USERNAME: __token__
         TWINE_PASSWORD: ${{ secrets.PYPI_TOKEN }}
       run: |
         twine upload --skip-existing wheelhouse/*
{% endraw %}
```

This should mean all previous consumers of my library can still use it. Platforms that don't support the
compilation should see no change and supported platforms will see a speed boost.

## Testing the compiled code

As part of my workflow I continuously run the unit tests and mypy. These give me relatively 
good confidence that the code will compile and work as I expect. Meaning I don't need to execute the compile step
whist I develop which helps keep the feedback cycle short.

However, despite these checks, I still want to make sure that the compiled library does behave in the same
way before merging any code. I use another github action to check this which runs on PRs. 
It builds the compiled wheel, installs it, then runs the test suite against it. 

```yaml
{% raw %}
    - name: Install dependencies
      run: |
        make setup
        pip install build
    - name: build wheel and then remove code
      run: |
        python -m build
        rm -rf ./lagom
    - name: install built wheel
      run: |
        find ./dist -name '*.whl'| head -n 1 | xargs pipenv install --skip-lock
    - name: Run Tests
      run: |
        pipenv run pytest tests -m "not benchmarking" -vv
{% endraw %}
```

I was glad I added these tests because they found a fairly major backwards compatability break.

## Native classes can't be used as a base class for inheritance
The documentation mentions that once a class is compiled it can't be extended by a python class. This was a problem
as a number of my tests rely on this. It would also be a fairly major BC break, so I'm glad the tests caught this.

Luckily mypyc has a solution and provides the `@mypyc_attr` decorator which can be used to allow extension:

```python
@mypyc_attr(allow_interpreted_subclasses=True)
class Container(
    WriteableContainer, ExtendableContainer, DefinitionsSource, ContainerDebugInfo
):
    ...
```

This comes at a slight performance cost but for maintaining the interface I felt it was worth it

## Was it worth it? The results

Now the important question is how much of a difference does this make? Was it worth the build complexity?

Luckily I have a benchmark set of tests I run using [pytest-benchmark](https://pypi.org/project/pytest-benchmark/).
Running these against the new compiled version I get the following:


```
---------------------------------------------------------------------------------------------- benchmark: 6 tests ----------------------------------------------------------------------------------------------
Name (time in us)                      Min                    Max                Mean              StdDev              Median                IQR            Outliers  OPS (Kops/s)            Rounds  Iterations
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test_optimised (compiled)         71.7450 (1.0)         971.7620 (1.65)      87.0807 (1.0)       20.9528 (1.0)       81.8410 (1.0)        5.2518 (1.0)     6107;9432       11.4836 (1.0)       87699           1
test_plain (compiled)             128.2760 (1.79)        588.2040 (1.0)      154.0175 (1.77)      32.0413 (1.53)     144.8510 (1.77)      9.5982 (1.83)    1084;1869        6.4928 (0.57)      14475           1
test_magic (compiled)             147.2380 (2.05)        598.4200 (1.02)     169.9302 (1.95)      36.6631 (1.75)     159.4025 (1.95)      8.2840 (1.58)      227;405        5.8848 (0.51)       2962           1
test_optimised (old)              159.1330 (2.22)     19,492.6290 (33.14)    218.7509 (2.51)     238.4710 (11.38)    185.7110 (2.27)     40.6575 (7.74)     542;4813        4.5714 (0.40)      43520           1
test_plain (old)                  250.3910 (3.49)        780.7970 (1.33)     289.7597 (3.33)      52.2043 (2.49)     272.0675 (3.32)     18.1820 (3.46)     839;1469        3.4511 (0.30)       9416           1
test_magic (old)                  271.6470 (3.79)      1,122.6480 (1.91)     314.4931 (3.61)      65.8549 (3.14)     291.0765 (3.56)     24.0800 (4.59)      230;353        3.1797 (0.28)       2718           1
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

So the TLDR from the above is that the compiled code performs more than twice as many operations per second as the
previous version of the code. I'm pretty happy with this from a mostly one time investment in my build tooling. 

I also believe there's some additional improvement that could be made with a little bit of profiling and work to 
make more modules compilable.

So if you maintain a fairly well typed library or codebase that could do with a speed boost I suggest you take a look 
at mypyc.

For now I've completely ignored the fact that mypyc is described as alpha quality. I have my escape hatch of maintaining
a pure python build alongside the compiled one.

## Extra - response to reddit & hacker news comments

### What was the total diff of the change?
The diff for me is relatively large because I also need to change to setuptools
and build a workflow around this but for anyone interested [here is the full diff](https://github.com/meadsteve/lagom/compare/22d670facf6acd2e5db33278aff32b64daf609cf...2.0.0)

### How does the compiled code compare on python 3.11
A [really interesting](https://www.reddit.com/r/Python/comments/xpamlp/comment/iq6uuqd/?context=3) question came from 
reddit asking how the performance compares when run on python 3.11. Python 3.11 has a number of improvements intended
to speed up regular execution.

I ran 3.11.0-rc.2 on a mac (running using a github action - so I would not take this example too seriously) first using
the pure python version and then the compiled version.

```
Name (time in us)                      Min                   Max                   Mean              StdDev              Median                IQR            Outliers         OPS (Kops/s)            Rounds  Iterations
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
test_optimised (compiled)              106.2480 (1.0)      4,241.7840 (1.98)     139.0374 (1.0)       53.1291 (1.08)     130.7245 (1.0)      14.4320 (1.0)     3248;6711        7.1923 (1.0)       71154           1
test_optimised (old)                   152.6050 (1.44)     3,837.4120 (1.79)     196.3902 (1.41)      49.4011 (1.0)      186.5420 (1.43)     23.1537 (1.60)    3448;4365        5.0919 (0.71)      47023           1
test_plain (compiled)                  200.0300 (1.88)     4,770.0280 (2.22)     236.2659 (1.70)      60.7922 (1.23)     231.8340 (1.77)     20.8140 (1.44)      201;367        4.2325 (0.59)      11430           1
test_magic (compiled)                  224.2850 (2.11)     2,833.1920 (1.32)     261.5948 (1.88)      64.9260 (1.31)     253.3900 (1.94)     21.6040 (1.50)       69;134        3.8227 (0.53)       2310           1
test_plain (old)                       280.1830 (2.64)     2,146.2120 (1.0)      331.2418 (2.38)      50.7920 (1.03)     318.7065 (2.44)     23.5730 (1.63)     894;1116        3.0189 (0.42)      10414           1
test_magic (old)                       315.3660 (2.97)     5,035.4740 (2.35)     356.1327 (2.56)     145.1398 (2.94)     342.8950 (2.62)     19.1577 (1.33)        13;89        2.8079 (0.39)       1151           1
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

So the compiled version was only 1.5 times faster this time. So there's still an advantage to compilation here but not
as great as the more than 2x I saw on other platforms.
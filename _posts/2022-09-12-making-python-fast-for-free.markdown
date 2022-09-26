---
layout: post
published: false
title:  "Making python fast for free - adventures with mypyc"
date:   2022-09-12 10:00:00
categories: programming
summary: "Attempting to speed up a library without changing the code using mypyc"
icon: fab fa-python
tags:
    - compilation
    - python
    - mypy
    - types
    - libraries
---

I recently learnt that mypy has a compiler called [mypyc](https://github.com/mypyc/mypyc). The compiler uses standard
python type hints to generate c extensions automatically from python code. I found the idea very interesting as
I have a library ([Lagom](https://lagom-di.readthedocs.io/en/stable/) - a dependency injection container)  
which is fairly extensively annotated with types. I liked the idea of getting a performance boost without having to 
rewrite any code or having to deal with multiple languages. This blogpost is intended to be a short overview of what
I did, the problems I ran into and the workflow I ended up with.

(Note: [Cython](https://cython.readthedocs.io/) has a similar target usage but can require a few more changes)

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
```

I limited cibuildwheel to cpython only with a `CIBW_BUILD` set to `cp3*` and each OS has the python 
version range specified (at the time of writing I had some problems building for linux with 3.11).

## Building a generic wheel for unsupported platforms

## Testing the compiled code

## Backwards compatability breaks - a new major version?

### Native classes can't be used as a base class for inheritance
### Luckily a decorator can be added to enabled inheritance

## Was it worth it? The results

---
layout: post
published: false
title: "How I publish python packages"
date:  2021-02-21 10:00:00
categories: programming
summary: "How I package up and tag python libraries I own"
icon: fab fa-python
tags:
    - python
    - packaging
    - library
    - release
    - flit
    - git
---
The purpose of this post is to give a brief overview of the pieces I've got in place to build and publish python libraries.
I'm not going to cover any of the steps in much detail though I may in later posts.

## Code and testing
The code is hosted on github. Github actions are triggered on each PR and push. The github action config is relatively small:

```yaml
name: Validate

on: [push, pull_request]

jobs:
  build:
    name: ${{ matrix.python-version }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.6", "3.7", "3.8", "3.9", "3.10.0-alpha.4"]

    steps:
    - uses: actions/checkout@v2
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v2
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        make setup
    - name: Run Tests
      run: |
        make test
```     

A makefile in my repo has a test target which runs some combination of:
    * [pytest](https://docs.pytest.org/en/stable/) - for testing (including doc tests)
    * [mypy](http://mypy-lang.org/) - for static analysis
    * [black](https://pypi.org/project/black/) - to check that code has been auto-formatted
    * [interrogate](https://pypi.org/project/interrogate/) - to make sure I've doc stringed a reasonable amount of the code.

I currently target all minor python versions higher than 3.6.

## Versioning
In the package I have a `version.py` this contains a variable representing the version of my package but also acts as a script that prints out the version number (I use this later in various bash scripts).
```python
# version.py
"""Module for tracking the version of the library"""
__version__ = "1.0.0"

if __name__ == "__main__":
    print(__version__)
```

This version number is also imported from the root of my python package:

```python
# __init__.py
from .version import __version__
```

## python packaging
For building and getting the package onto pypi I use [flit](https://github.com/takluyver/flit). So far
it's the simplest tool I've found for this and works with a fairly small amount of config.

```toml
# pyproject.toml
[build-system]
requires = ["flit_core >=2,<4"]
build-backend = "flit.buildapi"

[tool.flit.metadata]
module = "lagom"
author = "meadsteve"
author-email = "steve@meadsteve.dev"
requires-python="~=3.6"
description-file="README.md"
classifiers = [
  "License :: OSI Approved :: MIT License",
  "Programming Language :: Python :: 3.6",
  "Programming Language :: Python :: 3.7",
  "Programming Language :: Python :: 3.8",
  "Programming Language :: Python :: 3.9",
  "Topic :: Software Development :: Libraries",
  "Typing :: Typed",
]

[tool.flit.sdist]
exclude = ["tests/", "scripts/"]
```


## Publish script

Once the build checks have passed on github I have a bash script called `publish.sh` that I run locally.
This does a few things

### Checks for any blocking issues
Sometimes I have something I want to fix before I consider releasing. The master branch may contain breaking changes
or be broken. So I don't forget I create an issue tagged as a release_blocker and use the github api to check there
are none of these.

```bash
blocking_issues=$(curl 'https://api.github.com/repos/meadsteve/lagom/issues?labels=release_blocker'|jq length)

if [[ "$blocking_issues" -gt 0 ]]; then
  echo "There are $blocking_issues issues that must be fixed before release."
  exit 1
fi
```

### Checks for existing git tags with the version number
I have a git tag for each released version of the software. So before any packaging I check that
a tag with the current version doesn't already exist (this is where `version.py` from earlier helps).
```bash
version=$(pipenv run python lagom/version.py)

git fetch --tags

if git tag --list | grep "$version\$";
then
    echo "Version already released"
    exit 2
fi
```

### Push and tag
Finally if everything was okay then I run the flit command that publishes the package. After this is successful
I automatically tag the commit and push this back up to the main github repo.
```bash
pipenv run flit publish
git tag -a "$version" -m "$version"
git push origin "$version"
exit 0
```

## And that's it
I've not spent too much time on this flow but it gives me enough automation and tracking to be comfortable in
releasing code without too much fuss that I know has been tested.
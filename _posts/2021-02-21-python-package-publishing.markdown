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

TODO: Writing

publish.sh
```bash
#!/usr/bin/env bash

set -ex

# First check for any issues that need to be resolved before releasing
blocking_issues=$(curl 'https://api.github.com/repos/meadsteve/lagom/issues?labels=release_blocker'|jq length)

if [[ "$blocking_issues" -gt 0 ]]; then
  echo "There are $blocking_issues issues that must be fixed before release."
  exit 1
fi

# Next check that we've not already released this version
version=$(pipenv run python lagom/version.py)

git fetch --tags

if git tag --list | grep "$version\$";
then
    echo "Version already released"
    exit 2
fi

# Everything is okay. Tag and publish to pypi
git rev-parse HEAD > lagom/githash.txt
pipenv run flit publish
git tag -a "$version" -m "$version"
git push origin "$version"
exit 0
```

pyproject.toml
```toml
[build-system]
requires = ["flit_core >=2,<4"]
build-backend = "flit.buildapi"

[tool.flit.metadata]
module = "lagom"
author = "meadsteve"
author-email = "meadsteve@gmail.com"
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
include = ["lagom/githash.txt"]
exclude = ["tests/", "scripts/"]
```

```python
# version.py
"""Module for tracking the version of the library"""
__version__ = "1.0.0"

if __name__ == "__main__":
    print(__version__)
```

```python
# __init__.py
from .version import __version__
```

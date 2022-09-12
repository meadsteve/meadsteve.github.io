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

TODO: content

## Attempting to compile the whole thing

### The main blocker - no nested class definitions (mypyc issue 864)
https://github.com/mypyc/mypyc/issues/864

## Picking core modules

## Building a generic wheel for unsuported platforms

## Testing the compiled code

## Was it worth it? The results

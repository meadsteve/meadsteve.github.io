---
layout: post
title: "Follow up to 'types at the edges'"
date:   2021-10-05 10:00:00
categories: programming
icon: fab fa-python
tags:
    - python
    - types
    - testing
    - contracts
    - pydantic
    - bugs
    - error tracking
---

A little over a year ago I wrote [Types at the edges in Python]({% post_url 2020-02-10-types-at-the-edges-in-python %}) 
to share a pattern I've been moving towards with my python development. Recently I read [Parse, don’t validate][lexi-lambda-blog-post]
and I think Alexis' blog post does a wonderful job of explaining the concept of "type driven design".

On reflection my post is effectively a technique to start applying this approach to python and do less
"Shotgun parsing".

Alexis' post is haskell focussed, but I think it's a great read for programmers of any language.

[lexi-lambda-blog-post]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
---
layout: post
published: false
title: "Advent of Reflection"
date:  2020-12-16 10:00:00
categories: programming
summary: "How I typically pin docker images for a project"
icon: fab fa-docker
tags:
    - docker
    - pinning
    - digest
    - versioning
---

This isn't a particurally new thing but I was talking to a friend about this recently and I decided to write up what I said more formally.

The short answer is for docker images I tend to pin by both a tag **and** a digest. I'll go through why here.

## Step one - no pinning at all
```dockerfile
FROM python
```

This will work. I'll use it whilst hacking something together. But how long will it work for? There's no request for any specific version of python at all so you'll
end up with whatever the lastest happens to be

## Step two - pinning by tag
```dockerfile
FROM python:3.8
```

This is better. I'm now communicating what I actually depend on. In this example that I want a python container with python 3.8. I can get more specific
too:

```dockerfile
FROM python:3.8.3-slim
```

For a lot of use cases this is probably enough. Whenever I build my continer I will be building with python `3.8.3` and it will be the slim image. 
However I'm not protected from bringing in unexpected changes. Docker tags are mutable. `3.8.3-slim` today is not the same as `3.8.3-slim` tomorrow.

## Step three - pinning by tag and digest
```dockerfile
FROM python:3.8.3-slim@sha256:9b574c348d20673be5a5c716f4fdefac56643c103c0c7005e2160c6a843faab8
```
https://docs.docker.com/engine/reference/commandline/pull/#pull-an-image-by-digest-immutable-identifier

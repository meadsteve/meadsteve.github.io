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

TODO

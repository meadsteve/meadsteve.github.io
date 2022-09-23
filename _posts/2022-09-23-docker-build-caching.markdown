---
layout: post
published: false
title:  "Using a docker repository as a distributed layer cache for CI"
date:   2022-09-23 10:00:00
categories: docker
summary: "Steps to use --cache-from to speed up CI builds that use docker"
icon: fab fa-docker
tags:
    - docker
    - CI
    - speed
    - caching
    - builds
---

TODO: explain the snippit

```
# ${IMAGE}  is some path to a docker repo (maybe artifactory)
# First pull the image to use as a cache
docker pull ${IMAGE} || true
# Build with the image as a cache. Any layer already built in the cache can the be skipped
DOCKER_BUILDKIT=1 docker build -t ${IMAGE} --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${IMAGE} .
# Push back to the cache to keep the cache up to date.
docker push ${IMAGE}  
```

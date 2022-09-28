---
layout: post
published: false
title:  "Using a docker repository as a distributed layer cache for CI"
date:   2022-09-28 10:00:00
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
This is a short blog post to cover a feature I hadn't realised existed in docker: using an existing image 
as a source for layer caches.

## The problem
At a lot of my workplaces we've often had at least one project that fits the following profile:

* A project that users a docker container for some CI job.
* The docker container installs a few system dependencies then some language dependencies.
* The dependencies change relatively infrequently.
* The build is run a few times a day, enough to warm up the docker cache on all the CI workers.
* A system that you may not work on often, so you want quick feedback from CI before moving to another task.

Recently at my last contract we had exactly one of these. It was a node based build and the test suite
itself was quite quick but the docker image build took quite a few minutes.

## A solution

A lot of CI platforms have solutions for distributed docker layer caching (I know at 
least [circleci](https://circleci.com/docs/docker-layer-caching) and 
[github actions](https://depot.dev/blog/docker-layer-caching-in-github-actions) have it). 

At the time of writing this post this was not an option on our internally hosted bamboo CI. What
we did have though, was an internal docker repository(using artifactory). I'd also recently learnt about docker's 
[`--cache-from`](https://docs.docker.com/engine/reference/commandline/build/#specifying-external-cache-sources) 
argument. This allows you to use an existing image as a layer cache for a build.

So we changed the CI job to do the following (instead of just a plain `docker build`)

```bash
IMAGE = some.remote.docker.cache.net/team/image_name

# First pull the image to use as a cache
docker pull ${IMAGE} || true

# Build with the image as a cache. Any layer already built in the cache can the be skipped
DOCKER_BUILDKIT=1 docker build -t ${IMAGE} --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${IMAGE} .

# Push back to the cache to keep the cache up to date.
docker push ${IMAGE}  
```

breaking this down a little:

### IMAGE = some.remote.docker.cache.net/team/image_name
In our case this pointed to an image on our local docker image registry. It
didn't exist at the start but the very first CI job to run the build would publish this image.

### `DOCKER_BUILDKIT=1`
In order for cache metadata to be created in a built image [buildkit](https://docs.docker.com/develop/develop-images/build_enhancements/) 
must be used. This is supported from docker version `18.09`. It can only build linux containers but this was not an 
issue for this particular project.

### `--build-arg BUILDKIT_INLINE_CACHE=1`
This argument tells buildkit to include the cache metadata in the generated image. This is what enables us to push this
image and use it as a cache source.

### `--cache-from`
This is the part that speeds up our build. Now for any of the layers in our docker container that haven't changed
the build can be skipped.

### `docker push ${IMAGE}`
This final step keeps the cache up to date. If one of the layers has changed, for example if a dependency has been 
updated, then this new updated layer will be pushed to the cache so the next build will benefit from it.

## Did it work?

So far, yes. The build times dropped and everything seems to work. One thing I really like about this solution is that
updates to dependencies get automatically updated in the cache. In the past I've seen this problem solved by creating
a "base image" with the dependencies bundled in. This added an extra manual step of bumping the base image whenver
dependencies got updated. Using a cache skips this complexity.
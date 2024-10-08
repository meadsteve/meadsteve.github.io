#!/usr/bin/env bash

set -ex

docker build --platform linux/arm64 -t githubpage-preview .
docker run --platform linux/arm64 -p 4000:4000 -v $(pwd):/site githubpage-preview
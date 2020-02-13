#!/usr/bin/env bash

set -ex

docker build -t githubpage-preview .
docker run -p 4000:4000 -v $(pwd):/site githubpage-preview
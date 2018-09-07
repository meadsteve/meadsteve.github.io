#!/usr/bin/env bash

set -ex

docker build -t ghpages .
docker run -v "$PWD":/usr/src/app -p "4000:4000" -it ghpages
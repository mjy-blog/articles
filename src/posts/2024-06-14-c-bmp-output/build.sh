#!/bin/sh

set -e

(cd embed && sh build.sh)

mkdir -p static
cp embed/result.bmp static/result.bmp

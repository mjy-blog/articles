#!/bin/bash

set -e

cd "$(dirname "$0")"

mkdir -p static

sh ../../static/c/raytracer/2024-06-16-the-raytracer-project/0/build.sh
cp ../../static/c/raytracer/2024-06-16-the-raytracer-project/0/result.bmp static/0.bmp

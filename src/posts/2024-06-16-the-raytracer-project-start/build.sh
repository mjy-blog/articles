#!/bin/bash

set -e

cd "$(dirname "$0")"

mkdir -p static

sh ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/0/build.sh
cp ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/0/result.bmp static/0.bmp

sh ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/1/build.sh
cp ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/1/result.bmp static/1.bmp

sh ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/2/build.sh
cp ../../embed/c/raytracer/2024-06-16-the-raytracer-project-start/2/result.bmp static/2.bmp

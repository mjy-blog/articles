#!/bin/bash

set -e

cd "$(dirname "$0")"

mkdir -p embed

sh ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/0/build.sh
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/0/result.bmp static/0.bmp
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/0/main.c.diff embed/0.diff

sh ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/1/build.sh
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/1/result.bmp static/1.bmp
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/1/main.c.diff embed/1.diff

sh ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/2/build.sh
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/2/result.bmp static/2.bmp
cp ../../static/c/raytracer/2024-06-17-the-raytracer-project-camera/2/main.c.diff embed/2.diff

#!/bin/bash

set -e

cd "$(dirname "$0")"

mkdir -p static
mkdir -p embed

sh ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/0/build.sh
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/0/result.bmp static/0.bmp
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/0/main.c.diff embed/0.diff

sh ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/1/build.sh
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/1/result.bmp static/1.bmp
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/1/main.c.diff embed/1.diff

sh ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/2/build.sh
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/2/result.bmp static/2.bmp
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/2/main.c.diff embed/2.diff

sh ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/3/build.sh
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/3/result.bmp static/3.bmp
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/3/main.c.diff embed/3.diff

sh ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/4/build.sh
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/4/result.bmp static/4.bmp
cp ../../embed/c/raytracer/2024-06-17-the-raytracer-project-camera/4/main.c.diff embed/4.diff

#!/bin/bash

set -e

cd "$(dirname "$0")"

sh ../../common/build.sh
! diff -U 3 ../../2024-06-16-the-raytracer-project-start/2/main.c main.c > main.c.diff

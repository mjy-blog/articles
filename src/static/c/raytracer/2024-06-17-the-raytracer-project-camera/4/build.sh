#!/bin/bash

set -e

cd "$(dirname "$0")"

sh ../../common/build.sh
! diff -U 3 ../3/main.c main.c > main.c.diff

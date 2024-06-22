#!/bin/sh

set -e

cd "$(dirname "$0")"

npm i
ls -a1 src/posts | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -L1 sh prebuild-per-post.sh
npm run build
ls -a1 src | grep -v ^posts\$ | grep -v ^embed\$ | grep -v ^include\$ | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -I {} cp -r src/{} out/{}
ls -a1 src/posts | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -L1 sh postbuild-per-post.sh

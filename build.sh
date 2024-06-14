#!/bin/sh

set -e

cd "$(dirname "$0")"

npm i
npm run build
ls -a1 src | grep -v ^posts\$ | grep -v ^static\$ | grep -v ^include\$ | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -I {} cp -r src/{} out/{}
ls -a1 src/posts | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -L1 sh postbuild-per-article.sh

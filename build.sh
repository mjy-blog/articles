#!/bin/sh

set -e

cd "$(dirname "$0")"

npm i
npm run build
ls -a1 src | grep -vE ^posts\$ | grep -v ^static\$ | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -I {} cp -r src/{} out/{}
ls -a1 src/posts | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -L1 sh postbuild-per-article.sh

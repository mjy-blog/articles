#!/bin/sh

set -e

cd "$(dirname "$0")"

POST_SLUG="$1"

if [ -z "$POST_SLUG" ]; then
  echo "ERROR: No article slug specified"
  exit 1
fi

[ ! -d "src/posts/$POST_SLUG/static" ] || (mkdir -p "out/public/$POST_SLUG" && cp -r "src/posts/$POST_SLUG/static" "out/public/$POST_SLUG/")
[ ! -d "src/posts/$POST_SLUG/components" ] || cp -r "src/posts/$POST_SLUG/components" "out/posts/$POST_SLUG/"

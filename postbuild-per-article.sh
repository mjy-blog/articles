#!/bin/sh

set -e

cd "$(dirname "$0")"

ARTICLE_SLUG="$1"

if [ -z "$ARTICLE_SLUG" ]; then
  echo "ERROR: No article slug specified"
  exit 1
fi

[ ! -d "src/posts/$ARTICLE_SLUG/build.sh" ] || (cd "src/posts/$ARTICLE_SLUG" && sh ./build.sh)
[ ! -d "src/posts/$ARTICLE_SLUG/static" ] || (mkdir -p "out/public/$ARTICLE_SLUG" && cp -r "src/posts/$ARTICLE_SLUG/static" "out/public/$ARTICLE_SLUG/")

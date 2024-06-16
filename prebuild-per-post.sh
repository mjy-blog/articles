#!/bin/sh

set -e

cd "$(dirname "$0")"

POST_SLUG="$1"

if [ -z "$POST_SLUG" ]; then
  echo "ERROR: No article slug specified"
  exit 1
fi

[ ! -f "src/posts/$POST_SLUG/build.sh" ] || (cd "src/posts/$POST_SLUG" && sh ./build.sh)

#!/bin/bash

set -e

cd "$(dirname "$0")/embed"

diff --strip-trailing-cr -U 3 before/page.tsx after/page.tsx | awk '{
  if ($1 == "---" || $1 == "+++") {
    print $1 " " $2
  } else {
    print $0
  }
}' > page.tsx.diff

diff --strip-trailing-cr -U 3 before/ClientComponent.tsx after/ClientComponent.tsx | awk '{
  if ($1 == "---" || $1 == "+++") {
    print $1 " " $2
  } else {
    print $0
  }
}' > ClientComponent.tsx.diff

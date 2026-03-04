#!/bin/bash
set +H
PROJ="$(cd "$(dirname "$0")" && pwd)"
echo "Starting Bellevoire dev server from: $PROJ"
cd "$PROJ"
node node_modules/.bin/next dev

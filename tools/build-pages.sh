#!/bin/sh
# Build for Cloudflare Pages: publish ONLY the game files.
# Server code (worker/), tools/, README and git history are never published.
# Cloudflare Pages settings: Build command = sh tools/build-pages.sh, Output directory = dist
set -e
rm -rf dist
mkdir -p dist/brand
cp index.html engine.js i18n.js version.json _headers dist/
cp brand/*.png dist/brand/
echo "Published files:"; find dist -type f | sort

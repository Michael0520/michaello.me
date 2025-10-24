#!/bin/bash
# Build Portfolio with Slidevs static files

set -e

echo "=== Building blog-metadata (required for .source generation) ==="
pnpm nx build blog-metadata

echo "=== Building Slidevs ==="
pnpm nx build slidevs

echo "=== Copying Slidevs output to Portfolio public/ ==="
mkdir -p apps/portfolio/public/talks
rm -rf apps/portfolio/public/talks/*
if [ -d "apps/slidevs/dist/talks" ]; then
  cp -r apps/slidevs/dist/talks/* apps/portfolio/public/talks/
  echo "Slidevs files copied successfully"
else
  echo "Warning: apps/slidevs/dist/talks not found, skipping copy"
fi

echo "=== Building Portfolio (includes Blog, Lab, Projects, Talks routes) ==="
pnpm nx build portfolio --prod

echo "=== Build complete ==="

#!/bin/bash
# Build Portfolio with Slidevs static files

set -e

echo "=== Copying Blog images to apps (required before MDX compilation) ==="
mkdir -p apps/portfolio/public/images
mkdir -p apps/blog/public/images
cp -r libs/blog-metadata/public/images/* apps/portfolio/public/images/
cp -r libs/blog-metadata/public/images/* apps/blog/public/images/
echo "Blog images copied to portfolio and blog apps"

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

echo "=== Copying Portfolio build output to root for Vercel ==="
rm -rf .next public
cp -r apps/portfolio/.next .next
cp -r apps/portfolio/public public
cp apps/portfolio/next.config.mjs next.config.mjs
echo "Build output, public files, and config copied to root"

echo "=== Build complete ==="

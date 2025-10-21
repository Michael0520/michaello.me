#!/bin/bash
# Build all Slidev presentations

set -e

echo "Building all Slidev presentations..."

# Get the absolute path of the slidevs directory
SLIDEVS_DIR="$(cd "$(dirname "$0")" && pwd)"

# Change to slidevs directory to ensure correct working directory
cd "$SLIDEVS_DIR"

# Find all slides.md files in */src/ directories
for slides in */src/slides.md; do
  # Check if file exists (in case no matches found)
  if [ ! -f "$slides" ]; then
    echo "No slide files found"
    exit 0
  fi

  # Extract talk directory name (e.g., 2025-06-29)
  talk_dir=$(dirname $(dirname "$slides"))

  echo "Building $talk_dir..."

  # Build each presentation with proper base path using absolute output path
  pnpm slidev build "$SLIDEVS_DIR/$slides" --base "/talks/$talk_dir/" --out "$SLIDEVS_DIR/dist/talks/$talk_dir"
done

echo "All presentations built successfully!"

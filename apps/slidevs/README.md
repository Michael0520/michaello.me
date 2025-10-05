# Slidevs - Presentation Slides

This directory contains all presentation slides built with [Slidev](https://sli.dev/).

## Structure

```
apps/slidevs/
├── 2025-06-29/          # Individual talk (YYYY-MM-DD format)
│   └── src/
│       ├── slides.md    # Main slide content
│       ├── components/  # Custom Vue components
│       ├── public/      # Static assets (images, etc.)
│       └── package.json # Slidev dependencies
├── package.json         # Root Slidev config
└── vercel.json         # Deployment config
```

## Development

```bash
# Run specific talk
cd apps/slidevs
pnpm dev

# Build for production
cd apps/slidevs
pnpm build
```

## Adding a New Talk

1. Create new directory with date: `YYYY-MM-DD/`
2. Create `src/` subdirectory inside
3. Copy `package.json` from existing talk
4. Create `slides.md` with your content
5. Update root `package.json` scripts to point to new talk

## Deployment

Each talk is built as a static site and deployed to `/slides/YYYY-MM-DD/` path.

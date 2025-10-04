# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**ALWAYS use `pnpm`** - NEVER use npm or yarn.

```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add new package
pnpm remove <package> # Remove package
```

## Common Commands

### Development

```bash
# Run all apps
pnpm dev

# Run specific app
pnpm nx dev docs
pnpm nx dev side-projects
pnpm nx dev slidevs
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app (production)
pnpm nx build docs --prod
pnpm nx build side-projects --prod
pnpm nx build slidevs --prod
```

### Code Quality

```bash
pnpm lint              # Lint all apps
pnpm format            # Format all files with Prettier
pnpm format:check      # Check formatting
pnpm type-check        # TypeScript type checking across all apps
```

### Nx Commands

```bash
pnpm nx graph                      # Visualize project dependencies
pnpm nx show projects              # List all projects
pnpm nx affected --target=build    # Build only affected projects
pnpm nx reset                      # Clear Nx cache
```

## Monorepo Architecture

### Apps Structure

```
apps/
├── docs/              # Main blog/documentation (Fumadocs + Next.js 15)
│   └── content/blog/  # MDX blog posts organized by category
├── side-projects/     # Side projects showcase (Next.js 15)
└── slidevs/          # Presentations/slides (Next.js 15)
```

### Libs Structure

```
libs/
├── site-config/      # Shared site configuration
│   └── src/
│       ├── index.ts           # Site metadata, author, social links
│       └── components/        # GoogleAnalytics, PostHog
└── shared-ui/        # Shared UI components (shadcn/ui)
    └── src/
        ├── components/ui/     # shadcn/ui components
        └── lib/utils.ts       # cn() utility
```

### Important Files

- `apps/docs/source.config.ts` - Fumadocs MDX configuration
- `apps/docs/lib/blog-source.ts` - Blog content loader
- `libs/site-config/src/index.ts` - Site-wide config (author, analytics, URLs)
- `commitlint.config.mjs` - Commit message validation rules

## Blog Content (Fumadocs)

### Content Location

Blog posts are in `apps/docs/content/blog/` organized by category:

- `frontend/` - Frontend articles (React, TypeScript, CSS, etc.)
- `backend/` - Backend articles (JWT, encoding, etc.)
- `leetcode/` - LeetCode problem solutions
- `tech-talk/` - Tech talks and discussions

### MDX Frontmatter

Each blog post requires strict YAML frontmatter:

```yaml
---
title: Your Post Title
description: Brief description
date: 2025-01-15
---
```

**CRITICAL**: No spaces before colons in YAML frontmatter.

### Blog Source

- Blog content is loaded via `blogSource` from `apps/docs/lib/blog-source.ts`
- Uses Fumadocs loader with `/blog` base URL
- Supports lucide-react icons in metadata

## Site Configuration

Global site config is centralized in `libs/site-config`:

```typescript
import { siteConfig } from '@milo-me/site-config';

// Available properties:
siteConfig.author; // { name, url }
siteConfig.site; // { name, title, description, url, locale, keywords }
siteConfig.social; // { github, linkedin, rss }
siteConfig.analytics; // { googleAnalyticsId, posthogApiKey, posthogHost }
```

## Language Policy

**No Chinese text in code files** - English only in:

- TypeScript/JavaScript files
- Component names and props
- Comments and documentation
- Configuration files

**Chinese is allowed ONLY in**:

- Blog content (MDX files in `apps/docs/content/blog/`)
- Markdown documentation intended for Chinese readers

## Commit Convention

This project enforces conventional commits via `commitlint`:

### Format

```
<type>(<scope>): <description>

[optional body]
```

### Required Scopes

- `docs` - Documentation & Blog app
- `side-projects` - Side projects app
- `slidevs` - Slides app
- `shared-ui` - Shared UI library
- `workspace` - Workspace-level changes
- `*` - Multiple apps/libs

### Types

`feat` | `fix` | `refactor` | `test` | `docs` | `chore` | `perf` | `style` | `build` | `ci`

### Examples

```bash
git commit -m "feat(docs): add new blog post about React hooks"
git commit -m "fix(shared-ui): correct button hover state"
git commit -m "chore(workspace): update dependencies"
```

**Note**: Scope is REQUIRED. Commits without scope will fail.

## Deployment (Vercel)

Each app has its own `vercel.json`:

- `apps/docs/vercel.json` → michaello.me
- `apps/side-projects/vercel.json` → side.michaello.me
- `apps/slidevs/vercel.json` → slides.michaello.me

Deploy as 3 separate Vercel projects:

1. Set **Root Directory** to `apps/<app-name>`
2. Vercel auto-detects `vercel.json` in each app
3. Build command: `pnpm nx build <app-name> --prod`
4. Output directory: `.next`

## Adding shadcn/ui Components

```bash
# Add component to shared-ui library
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card

# Components will be added to:
# libs/shared-ui/src/components/ui/
```

Then import from shared library:

```typescript
import { Button } from '@milo-me/shared-ui';
```

## Tech Stack

- **Monorepo**: Nx 21.6.3
- **Framework**: Next.js 15.3.0 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.9.2
- **Styling**: Tailwind CSS v4.0.0 (zero-config, CSS import style)
- **Documentation**: Fumadocs v15.8.3
- **Components**: shadcn/ui
- **Analytics**: Google Analytics + PostHog
- **Git Hooks**: Husky + lint-staged + commitlint

## Key Patterns

### Nx Workspace

- Uses Nx plugins: `@nx/next`, `@nx/react`, `@nx/playwright`
- Task caching enabled
- Affected detection for optimized builds

### Next.js 15

- All apps use App Router
- Server Components by default
- TypeScript strict mode

### Tailwind CSS v4

- Zero-config (no `tailwind.config.js`)
- Uses `@import "tailwindcss"` in CSS
- PostCSS plugin via `@tailwindcss/postcss`

### Fumadocs

- MDX-based documentation system
- Static generation (SSG) for blog posts
- Dynamic routes via `[[...slug]]`
- RootProvider for theme and layout

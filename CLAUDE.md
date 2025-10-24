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
pnpm nx dev portfolio      # Main portfolio app (port 3000)
pnpm nx dev blog           # Blog app (port 3001)
pnpm nx dev lab-home       # Lab homepage (port 3002)
cd apps/slidevs && pnpm dev  # Slidev (not managed by Nx)
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app (production)
pnpm nx build portfolio --prod   # Main portfolio app
pnpm nx build blog --prod        # Blog app
pnpm nx build lab-home --prod    # Lab homepage
cd apps/slidevs && pnpm build  # Slidev (not managed by Nx)
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
├── portfolio/              # Main landing page (Next.js 15) - Primary domain
│   ├── src/app/
│   │   ├── (app)/
│   │   │   ├── (root)/page.tsx    # Profile landing page
│   │   │   └── (docs)/            # Blog & components routes
│   │   │       ├── blog/          # Portfolio blog posts
│   │   │       └── components/    # Component showcase
│   │   ├── layout.tsx             # Root layout
│   │   ├── manifest.ts            # PWA manifest
│   │   └── sitemap.ts             # Sitemap generation
│   ├── src/features/
│   │   ├── profile/               # Profile components
│   │   └── blog/                  # Blog components
│   ├── content/                   # MDX blog posts
│   ├── next.config.mjs            # Multi-zone rewrites config
│   └── vercel.json                # Vercel deployment config
│
├── blog/                   # Blog website (Fumadocs + Next.js 15)
│   ├── src/app/
│   │   ├── page.tsx       # Blog homepage (lists all posts)
│   │   ├── posts/         # Blog posts routes
│   │   ├── projects/      # Projects showcase page
│   │   ├── talks/         # Talks/Presentations list page
│   │   └── about/         # About page (optional)
│   ├── content/posts/     # MDX blog posts organized by category
│   └── vercel.json        # Vercel deployment config
│
├── lab/                    # Lab projects folder
│   └── home/              # Lab homepage (Next.js 15)
│       ├── src/app/
│       │   └── page.tsx   # Lab projects list
│       ├── next.config.js # basePath: '/lab'
│       └── vercel.json    # Vercel deployment config
│
└── slidevs/               # Presentations/slides (Slidev)
    ├── 2025-06-29/        # Individual talk (date-based)
    │   └── src/
    │       ├── slides.md  # Slide content
    │       ├── components/# Custom Vue components
    │       └── public/    # Images and assets
    ├── package.json       # Slidev dependencies
    └── vercel.json        # Static site deployment
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

- `apps/blog/source.config.ts` - Fumadocs MDX configuration
- `apps/blog/lib/blog-source.ts` - Blog content loader (baseUrl: '/posts')
- `apps/blog/next.config.js` - Multi-Zones rewrites configuration
- `libs/site-config/src/index.ts` - Site-wide config (author, analytics, URLs)
- `commitlint.config.mjs` - Commit message validation rules

## Single Deployment Architecture

This monorepo uses a **unified single-deployment architecture** where all routes are served from one Next.js application.

### URL Structure

```
michaello.me/              → Portfolio (Landing page with profile)
michaello.me/blog          → Portfolio (Blog aggregation page)
michaello.me/components    → Portfolio (Component showcase)
michaello.me/posts         → Portfolio (Technical blog posts - Fumadocs)
michaello.me/posts/xxx     → Portfolio (Individual blog articles)
michaello.me/projects      → Portfolio (Projects showcase)
michaello.me/lab           → Portfolio (Lab projects homepage)
michaello.me/talks         → Portfolio (Talks/Presentations list + Slidevs static files)
michaello.me/talks/xxx     → Portfolio (Individual presentation slides - static HTML)
```

### How It Works

- **Portfolio app** serves all routes from a single Next.js deployment
- **Blog posts** (`/posts`) use Fumadocs for MDX content rendering
- **Lab projects** (`/lab`) are integrated as Portfolio routes
- **Slidevs presentations** (`/talks`) are built as static files and served from `public/talks/`
- **Single Vercel project** deployment with custom build script
- Build process:
  1. Build Slidevs presentations → `apps/slidevs/dist/talks/`
  2. Copy Slidevs output → `apps/portfolio/public/talks/`
  3. Build Portfolio with all integrated routes

## Blog Content (Fumadocs)

### Content Location

Blog posts are in `apps/blog/content/posts/` organized by category:

- `frontend/` - Frontend articles (React, TypeScript, CSS, etc.)
- `backend/` - Backend articles (JWT, encoding, etc.)
- `leetcode/` - LeetCode problem solutions
- `tech-talk/` - Tech talks and discussions

**Note**: The content remains in the original `apps/blog/content/posts/` location. Portfolio app reads from this location via `source.config.ts` and Fumadocs loader.

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

- Blog content is loaded via `blogSource` from `apps/portfolio/lib/blog-source.ts`
- Uses Fumadocs loader with `/posts` base URL
- Supports lucide-react icons in metadata
- Content sourced from `apps/blog/content/posts/` via `source.config.ts`

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

- Blog content (MDX files in `apps/blog/content/posts/`)
- Markdown documentation intended for Chinese readers

## Commit Convention

This project enforces conventional commits via `commitlint`:

### Format

```
<type>(<scope>): <description>

[optional body]
```

### Required Scopes

- `blog` - Blog/Main website app
- `lab-home` - Lab homepage app
- `lab-calculator` - Lab calculator app (future)
- `lab-todo` - Lab todo app (future)
- `slidevs` - Slides app
- `shared-ui` - Shared UI library
- `site-config` - Site configuration library
- `workspace` - Workspace-level changes
- `*` - Multiple apps/libs

### Types

`feat` | `fix` | `refactor` | `test` | `docs` | `chore` | `perf` | `style` | `build` | `ci`

### Examples

```bash
git commit -m "feat(blog): add new blog post about React hooks"
git commit -m "fix(shared-ui): correct button hover state"
git commit -m "chore(workspace): update dependencies"
git commit -m "feat(lab-home): create lab projects showcase"
```

**Note**: Scope is REQUIRED. Commits without scope will fail.

## Deployment (Vercel)

The entire site is deployed as a **single Vercel project**:

### Main Site (michaello.me)

- **Domain**: `michaello.me`, `www.michaello.me`
- **Vercel Project**: `michaello-portfolio` (or your Vercel project name)
- **Root Directory**: Leave empty (monorepo root)
- **Build Command**: `bash scripts/build-with-slidevs.sh`
- **Output Directory**: `apps/portfolio/.next`
- **Framework**: Next.js
- **Environment Variables**: All optional (can use defaults from `@milo-me/site-config`)
  - `NEXT_PUBLIC_BASE_URL` - Portfolio URL (default: auto-detected)
  - `GITHUB_USERNAME` - GitHub username for contributions graph
  - `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
  - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key (optional)

### Build Process

The custom build script (`scripts/build-with-slidevs.sh`) performs the following:

1. **Build Slidevs** - Generates static presentation files
2. **Copy Static Files** - Copies Slidevs output to `apps/portfolio/public/talks/`
3. **Build Portfolio** - Builds main Next.js app with all integrated routes

### What's Included

All routes served from single deployment:

- `/` - Portfolio landing page
- `/blog` - Blog aggregation page
- `/posts` - Technical blog (Fumadocs MDX)
- `/projects` - Projects showcase
- `/lab` - Lab projects homepage
- `/talks` - Presentations (static files from Slidevs)
- `/components` - Component showcase

## Adding Lab Projects

To add a new lab project (e.g., calculator):

1. Create new route: `apps/portfolio/src/app/(app)/(docs)/lab/calculator/page.tsx`
2. Implement the calculator component and logic
3. Update scope in `commitlint.config.mjs` if needed (use scope `portfolio` or `lab-calculator`)
4. Update `apps/portfolio/src/app/(app)/(docs)/lab/page.tsx` to list the new project
5. No separate deployment needed - all lab projects are part of Portfolio app

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
- **Deployment**: Single Vercel project with custom build script

## Key Patterns

### Nx Workspace

- Uses Nx plugins: `@nx/next`, `@nx/react`, `@nx/playwright`
- Task caching enabled
- Affected detection for optimized builds

### Next.js 15

- Uses App Router with route groups
- Server Components by default
- TypeScript strict mode
- Fumadocs integration for MDX blog posts
- Static file serving for Slidevs presentations

### Tailwind CSS v4

- Zero-config (no `tailwind.config.js`)
- Uses `@import "tailwindcss"` in CSS
- PostCSS plugin via `@tailwindcss/postcss`

### Fumadocs

- MDX-based documentation system
- Static generation (SSG) for blog posts
- Dynamic routes via `[[...slug]]`
- RootProvider for theme and layout

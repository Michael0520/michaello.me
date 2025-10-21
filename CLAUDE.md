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

## Multi-Zones Architecture

This monorepo uses **Next.js Multi-Zones** to serve multiple apps under a single domain (`michaello.me`).

### URL Structure

```
michaello.me/              → portfolio app (Landing page with profile)
michaello.me/blog          → portfolio app (Portfolio blog posts)
michaello.me/blog/xxx      → portfolio app (Portfolio blog articles)
michaello.me/components    → portfolio app (Component showcase)
michaello.me/components/xxx → portfolio app (Component details)

michaello.me/posts         → blog app (via rewrite to separate deployment)
michaello.me/posts/xxx     → blog app (via rewrite to separate deployment)

michaello.me/lab           → lab/home app (via rewrite)
michaello.me/lab/calculator → lab/calculator app (future)
michaello.me/lab/todo      → lab/todo app (future)

michaello.me/talks         → slidevs app (via rewrite)
michaello.me/talks/xxx     → slidevs app (individual slides)
```

### How Multi-Zones Work

- **portfolio** app is the main zone (no basePath) deployed to main domain
- **blog** app serves `/posts` routes (deployed separately, accessed via rewrite)
- **lab/home** app uses `basePath: '/lab'` (deployed separately, accessed via rewrite)
- **slidevs** app uses `basePath: '/talks'` (deployed separately, accessed via rewrite)
- Portfolio's `next.config.mjs` contains `rewrites()` to route `/posts/*`, `/lab/*`, and `/talks/*` to their respective Vercel deployments

## Blog Content (Fumadocs)

### Content Location

Blog posts are in `apps/blog/content/posts/` organized by category:

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

- Blog content is loaded via `blogSource` from `apps/blog/lib/blog-source.ts`
- Uses Fumadocs loader with `/posts` base URL
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

Each app is deployed as a separate Vercel project:

### Portfolio (Main Zone)

- **Domain**: `michaello.me`, `www.michaello.me`
- **Vercel Project**: `michaello-portfolio` (or your Vercel project name)
- **Root Directory**: Leave empty (monorepo root)
- **Build Command**: `pnpm nx build portfolio --prod`
- **Output Directory**: `apps/portfolio/.next`
- **Framework**: Next.js
- **Environment Variables**: All optional (can use defaults from `@milo-me/site-config`)
  - `NEXT_PUBLIC_BASE_URL` - Portfolio URL (default: auto-detected)
  - `GITHUB_USERNAME` - GitHub username for contributions graph
  - `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
  - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key (optional)

**Important**: Portfolio app uses rewrites to route `/posts`, `/lab`, and `/talks` to other Vercel deployments. Update the URLs in `apps/portfolio/next.config.mjs` after deploying other apps.

### Blog

- **Domain**: None (accessed via rewrite from portfolio: `/posts`)
- **Vercel Project**: `michaello-blog`
- **Root Directory**: Leave empty (monorepo root)
- **Build Command**: `pnpm nx build blog --prod`
- **Output Directory**: `apps/blog/.next`
- **Framework**: Next.js

### Lab Home

- **Domain**: None (accessed via rewrite from portfolio: `/lab`)
- **Vercel Project**: `michaello-lab-home`
- **Root Directory**: Leave empty
- **Build Command**: `pnpm nx build lab-home --prod`
- **Output Directory**: `apps/lab/home/.next`
- **Framework**: Next.js

### Slidevs

- **Domain**: None (accessed via rewrite from portfolio: `/talks`)
- **Vercel Project**: `michaello-slides`
- **Root Directory**: Leave empty
- **Build Command**: `pnpm nx build slidevs --prod`
- **Output Directory**: `apps/slidevs/.next`
- **Framework**: Next.js

## Adding Lab Projects

To add a new lab project (e.g., calculator):

1. Create new app: `apps/lab/calculator/`
2. Add `next.config.js` with `basePath: '/lab/calculator'`
3. Create `project.json` with name `lab-calculator`
4. Add to `commitlint.config.mjs` scopes
5. Deploy to Vercel as separate project
6. Add rewrite in `apps/blog/next.config.js`
7. Update `apps/lab/home/src/app/page.tsx` to list the new project

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
- **Multi-Zones**: Next.js Multi Zones with rewrites

## Key Patterns

### Nx Workspace

- Uses Nx plugins: `@nx/next`, `@nx/react`, `@nx/playwright`
- Task caching enabled
- Affected detection for optimized builds

### Next.js 15

- All apps use App Router
- Server Components by default
- TypeScript strict mode
- Multi-Zones for single-domain deployment

### Tailwind CSS v4

- Zero-config (no `tailwind.config.js`)
- Uses `@import "tailwindcss"` in CSS
- PostCSS plugin via `@tailwindcss/postcss`

### Fumadocs

- MDX-based documentation system
- Static generation (SSG) for blog posts
- Dynamic routes via `[[...slug]]`
- RootProvider for theme and layout

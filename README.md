# Michaello.me - Personal Website Monorepo

A modern Nx monorepo for [michaello.me](https://michaello.me) using Next.js Multi-Zones architecture.

## Architecture

### Multi-Zones Design

This monorepo serves **multiple independent Next.js applications** under a **single domain** using Next.js Multi-Zones pattern.

```
michaello.me/              → Portfolio App (Main Zone)
michaello.me/blog          → Portfolio App (blog list)
michaello.me/components    → Portfolio App (component showcase)

michaello.me/posts/*       → Blog App (via rewrite, full content)
michaello.me/projects      → Blog App (via rewrite)
michaello.me/talks         → Blog App (via rewrite)

michaello.me/lab/*         → Lab Home App (via rewrite)
michaello.me/talks/*       → Slidevs App (via rewrite)
```

**How it works:**

- `portfolio` app is the **main zone** (deployed to `michaello.me`)
- Other apps (`blog`, `lab-home`, `slidevs`) are deployed separately
- Main zone's `next.config.mjs` contains `rewrites()` to route traffic to other apps
- Each app is **deployed separately** on Vercel
- User sees **one unified domain**

### Project Structure

```
michaello.me/
├── apps/
│   ├── portfolio/                 # Main Zone (michaello.me)
│   │   ├── src/app/
│   │   │   ├── (root)/           # Profile landing page
│   │   │   └── (docs)/           # Blog list & components
│   │   └── next.config.mjs       # ⭐ Multi-Zones rewrites config
│   │
│   ├── blog/                     # Blog Zone (michaello.me/posts)
│   │   ├── src/app/
│   │   │   ├── page.tsx          # Blog homepage
│   │   │   └── posts/[[...slug]] # Full MDX articles
│   │   ├── content/posts/        # MDX blog content
│   │   │   ├── frontend/         # ~11 posts
│   │   │   ├── backend/
│   │   │   ├── leetcode/
│   │   │   └── tech-talk/
│   │   └── next.config.mjs
│   │
│   ├── lab/home/                 # Lab Zone (michaello.me/lab)
│   │   ├── src/app/page.tsx     # Lab projects list
│   │   └── next.config.mjs      # basePath: '/lab'
│   │
│   └── slidevs/                  # Slides Zone (michaello.me/talks)
│       ├── 2025-06-29/           # Date-organized presentations
│       │   └── src/slides.md
│       └── next.config.mjs       # basePath: '/talks'
│
└── libs/
    ├── blog-metadata/            # Blog metadata extraction
    │   └── src/
    │       ├── index.ts          # Public API
    │       └── lib/posts-metadata.json
    ├── site-config/              # Shared site metadata
    │   └── src/
    │       ├── index.ts          # Author, social, analytics config
    │       └── components/       # GoogleAnalytics, PostHog
    └── shared-ui/                # Shared UI components
        └── src/components/ui/    # shadcn/ui components
```

### Key Architecture Principles

1. **Independent Deployment**: Each app has its own Vercel project
2. **Shared Libraries**: `blog-metadata`, `site-config`, and `shared-ui` shared via Nx
3. **Type Safety**: TypeScript strict mode across all apps
4. **Zero-Config Styling**: Tailwind CSS v4 (no config file needed)
5. **Content-Driven**: Blog uses Fumadocs MDX loader with static generation
6. **Build Optimization**: `nx-ignore` skips unnecessary builds on Vercel

## Tech Stack

| Layer               | Technology                        |
| ------------------- | --------------------------------- |
| **Monorepo**        | Nx 21.6.3                         |
| **Framework**       | Next.js 15.3.0 (App Router)       |
| **Runtime**         | React 19.0.0                      |
| **Language**        | TypeScript 5.9.2                  |
| **Styling**         | Tailwind CSS v4.0.0 (zero-config) |
| **Documentation**   | Fumadocs v15.8.3                  |
| **Presentations**   | Slidev v51.8.1 (Vue 3)            |
| **Components**      | shadcn/ui                         |
| **Package Manager** | pnpm                              |
| **Deployment**      | Vercel (Multi-Zones)              |

## Deployment Architecture

Each app is deployed as a **separate Vercel project**:

| App           | Vercel Project        | Domain         | Build Command                    | Output Dir             | Ignore Command            |
| ------------- | --------------------- | -------------- | -------------------------------- | ---------------------- | ------------------------- |
| **portfolio** | `michaello-portfolio` | `michaello.me` | `pnpm nx build portfolio --prod` | `apps/portfolio/.next` | `npx nx-ignore portfolio` |
| **blog**      | `michaello-blog`      | (via rewrite)  | `pnpm nx build blog --prod`      | `apps/blog/.next`      | `npx nx-ignore blog`      |
| **lab-home**  | `michaello-lab-home`  | (via rewrite)  | `pnpm nx build lab-home --prod`  | `apps/lab/home/.next`  | `npx nx-ignore lab-home`  |
| **slidevs**   | `michaello-slides`    | (via rewrite)  | `pnpm nx build slidevs --prod`   | `apps/slidevs/dist`    | `npx nx-ignore slidevs`   |

**Multi-Zones Configuration** (`apps/portfolio/next.config.mjs`):

```javascript
async rewrites() {
  return [
    { source: '/posts', destination: 'https://michaello-blog.vercel.app/posts' },
    { source: '/posts/:path*', destination: 'https://michaello-blog.vercel.app/posts/:path*' },
    { source: '/lab', destination: 'https://michaello-lab-home.vercel.app/lab' },
    { source: '/lab/:path*', destination: 'https://michaello-lab-home.vercel.app/lab/:path*' },
    { source: '/talks', destination: 'https://michaello-slides.vercel.app/talks' },
    { source: '/talks/:path*', destination: 'https://michaello-slides.vercel.app/talks/:path*' }
  ]
}
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                    # All apps
pnpm nx dev portfolio       # Specific app (port 3000)
pnpm nx dev blog            # Blog app (port 3001)
pnpm nx dev lab-home        # Lab home (port 3002)

# Production build
pnpm build                  # All apps
pnpm nx build portfolio --prod   # Specific app

# Code quality
pnpm lint
pnpm format
pnpm type-check

# Nx utilities
pnpm nx graph               # Visualize dependencies
pnpm nx show projects       # List all projects
```

## Blog Content Workflow

**Fully automated workflow** - metadata extraction is automatic via Git hooks.

### Writing a New Post

1. **Create/Edit MDX file**: `apps/blog/content/posts/frontend/new-article.mdx`

   ```yaml
   ---
   title: Article Title
   description: Brief description
   date: 2025-01-15
   category: frontend
   featured: true # Optional
   icon: lucide:star # Optional
   ---
   Article content here...
   ```

2. **Commit your changes**:

   ```bash
   git add apps/blog/content/posts/frontend/new-article.mdx
   git commit -m "feat(blog): add new blog post about XXX"
   # → Pre-commit hook automatically:
   #    ✅ Detects MDX changes
   #    ✅ Runs extract-metadata
   #    ✅ Stages posts-metadata.json
   ```

3. **Push to deploy**:

   ```bash
   git push
   # → Vercel automatically:
   #    ✅ Blog app: Detects content changes → Rebuilds
   #    ✅ Portfolio app: Detects metadata changes → Rebuilds
   #    ⏭️ Other apps: Skips build (nx-ignore)
   ```

### Manual Metadata Extraction (if needed)

```bash
pnpm nx run blog-metadata:extract-metadata
```

Only needed if you bypass Git hooks or need to regenerate metadata manually.

## Shared Libraries

### `blog-metadata`

Extracts metadata from blog MDX files for Portfolio's article list:

```typescript
import { getAllPosts, getFeaturedPosts } from '@milo-me/blog-metadata';

const allPosts = getAllPosts(); // All blog posts metadata
const featured = getFeaturedPosts(3); // Top 3 featured posts
```

### `site-config`

Centralized site configuration for all apps:

```typescript
import { siteConfig } from '@milo-me/site-config';

siteConfig.author; // { name, url }
siteConfig.site; // { name, title, description, url }
siteConfig.social; // { github, linkedin, rss }
siteConfig.analytics; // { googleAnalyticsId, posthogApiKey }
```

### `shared-ui`

Shared UI components (shadcn/ui):

```typescript
import { Button, Card } from '@milo-me/shared-ui';
```

## Design Decisions

| Decision                      | Rationale                                               |
| ----------------------------- | ------------------------------------------------------- |
| **Multi-Zones over Monolith** | Independent scaling, deployment, and tech stack per app |
| **Nx Monorepo**               | Code sharing, unified tooling, dependency graph         |
| **blog-metadata Library**     | Decouples portfolio listing from blog content rendering |
| **Separate Vercel Projects**  | Isolated deployments, independent CI/CD pipelines       |
| **nx-ignore**                 | Skip unnecessary builds using Nx affected detection     |
| **Tailwind CSS v4**           | Zero-config, faster builds, better DX                   |
| **Fumadocs**                  | MDX-first, type-safe, excellent DX for documentation    |

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Development guide for AI assistants (commit conventions, commands, patterns)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture documentation (apps, libs, workflows, deployment)

## References

- [Next.js Multi-Zones](https://nextjs.org/docs/advanced-features/multi-zones)
- [Nx Monorepo](https://nx.dev)
- [Fumadocs](https://fumadocs.vercel.app)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [nx-ignore on Vercel](https://vercel.com/docs/monorepos/nx)

---

**License**: Private
**Last Updated**: 2025-01-23

# @milo-me/blog-metadata

Blog metadata extraction library for Portfolio app's article listing.

## Purpose

This library extracts metadata from blog MDX files to provide a type-safe interface for displaying article lists without requiring filesystem access to blog content.

**Why it exists:**

- Portfolio app only needs metadata (title, date, description) for article lists
- Avoids cross-app file system dependencies
- Provides single source of truth for blog metadata
- Type-safe interface with full TypeScript support

## Data Flow

```
Blog MDX Files (apps/blog/content/posts/**/*.mdx)
    ↓ extract-metadata script
posts-metadata.json
    ↓ Nx build
dist/libs/blog-metadata
    ↓ imported by Portfolio
Display article lists
```

## Installation

Already configured in the monorepo. Import directly:

```typescript
import { getAllPosts, getFeaturedPosts } from '@milo-me/blog-metadata';
```

## API

### Types

```typescript
type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  category: 'frontend' | 'backend' | 'leetcode' | 'tech-talk';
  image?: string;
  featured?: boolean;
  icon?: string; // lucide icon name
};
```

### Functions

#### `getAllPosts(): PostMetadata[]`

Returns all blog posts sorted by date (newest first).

```typescript
import { getAllPosts } from '@milo-me/blog-metadata';

const posts = getAllPosts();
// [{ slug: 'my-post', title: 'My Post', ... }, ...]
```

#### `getFeaturedPosts(limit?: number): PostMetadata[]`

Returns featured posts (where `featured: true`). Defaults to 3 posts.

```typescript
import { getFeaturedPosts } from '@milo-me/blog-metadata';

const featured = getFeaturedPosts(5); // Top 5 featured posts
```

#### `getLatestPosts(limit?: number): PostMetadata[]`

Returns latest posts sorted by date. Defaults to 5 posts.

```typescript
import { getLatestPosts } from '@milo-me/blog-metadata';

const latest = getLatestPosts(10); // 10 most recent posts
```

#### `getPostsByCategory(category: string): PostMetadata[]`

Returns posts filtered by category.

```typescript
import { getPostsByCategory } from '@milo-me/blog-metadata';

const frontendPosts = getPostsByCategory('frontend');
```

#### `getPostBySlug(slug: string): PostMetadata | undefined`

Returns a single post by slug.

```typescript
import { getPostBySlug } from '@milo-me/blog-metadata';

const post = getPostBySlug('my-post-slug');
```

## Usage in Portfolio App

```typescript
import { getFeaturedPosts, getLatestPosts } from '@milo-me/blog-metadata';

export default function BlogPage() {
  const featured = getFeaturedPosts(3);
  const latest = getLatestPosts(5);

  return (
    <div>
      <section>
        <h2>Featured Posts</h2>
        {featured.map((post) => (
          <article key={post.slug}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <a href={`/posts/${post.slug}`}>Read more</a>
          </article>
        ))}
      </section>

      <section>
        <h2>Latest Posts</h2>
        {latest.map((post) => (
          <article key={post.slug}>
            <h3>{post.title}</h3>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </article>
        ))}
      </section>
    </div>
  );
}
```

## Development

### Extract Metadata

When blog content changes, run:

```bash
pnpm nx run blog-metadata:extract-metadata
```

This parses all MDX files in `apps/blog/content/posts/` and generates `posts-metadata.json`.

### Build Library

```bash
pnpm nx build blog-metadata
```

This compiles the library and includes the metadata JSON in the dist output.

### Build Targets

- `extract-metadata` - Parse MDX files and generate JSON
- `build` - Compile library (depends on extract-metadata)

## Nx Project Configuration

Located in `libs/blog-metadata/project.json`:

```json
{
  "targets": {
    "extract-metadata": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx libs/blog-metadata/scripts/extract-metadata.ts"
      }
    },
    "build": {
      "dependsOn": ["extract-metadata"]
    }
  }
}
```

## Important Notes

- Metadata extraction must run before building Portfolio app
- The JSON file is bundled with the library distribution
- Changes to blog content require re-extracting metadata
- Portfolio app NEVER accesses blog MDX files directly

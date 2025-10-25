# @milo-me/blog-content

Shared blog content library for the monorepo.

## Structure

```
libs/blog-content/
└── content/
    └── posts/
        ├── frontend/     # Frontend articles
        ├── backend/      # Backend articles
        ├── leetcode/     # LeetCode solutions
        └── tech-talk/    # Tech discussions
```

## Usage

This library provides shared blog content that can be consumed by:

- `apps/portfolio` - Main portfolio app with /posts routes
- `apps/blog` - Dedicated blog app
- `libs/blog-metadata` - Metadata extraction

All apps reference the same content source, ensuring consistency and avoiding duplication.

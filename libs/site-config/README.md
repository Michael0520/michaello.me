# @milo-me/site-config

Centralized site configuration and metadata for all apps in the monorepo.

## Purpose

Provides a single source of truth for site-wide configuration including author information, social links, analytics, and SEO metadata.

## Installation

Already configured in the monorepo. Import directly:

```typescript
import { siteConfig } from '@milo-me/site-config';
```

## Configuration

### Author Information

```typescript
siteConfig.author = {
  name: 'Michael Lo',
  url: 'https://www.michaello.me',
};
```

### Site Metadata

```typescript
siteConfig.site = {
  name: 'Michael Lo',
  title: 'Michael Lo - Software Engineer',
  description: 'Personal website and blog about web development',
  url: 'https://www.michaello.me',
  locale: 'zh-TW',
  keywords: ['Next.js', 'React', 'TypeScript', 'Web Development'],
};
```

### Social Links

```typescript
siteConfig.social = {
  github: 'https://github.com/Michael0520',
  linkedin: 'https://linkedin.com/in/michael-lo',
  rss: 'https://www.michaello.me/rss.xml',
};
```

### Analytics

```typescript
siteConfig.analytics = {
  googleAnalyticsId: 'G-XXXXXXXXXX',
  posthogApiKey: 'phc_xxxxxxxxxxxx',
  posthogHost: 'https://app.posthog.com',
};
```

### Copyright

```typescript
siteConfig.copyright = '© 2025 Michael Lo. All rights reserved.';
```

## Usage

### In Next.js Layout (Metadata)

```typescript
import { siteConfig } from '@milo-me/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  keywords: siteConfig.site.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.site.locale,
    url: siteConfig.site.url,
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    siteName: siteConfig.site.name,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.site.locale}>
      <body>{children}</body>
    </html>
  );
}
```

### In Components

```typescript
import { siteConfig } from '@milo-me/site-config';

export function Footer() {
  return (
    <footer>
      <p>{siteConfig.copyright}</p>
      <nav>
        <a href={siteConfig.social.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}
```

### In Pages

```typescript
import { siteConfig } from '@milo-me/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About - ${siteConfig.site.name}`,
  description: `Learn more about ${siteConfig.author.name}`,
};

export default function AboutPage() {
  return (
    <main>
      <h1>About {siteConfig.author.name}</h1>
      <p>{siteConfig.site.description}</p>
    </main>
  );
}
```

## Helper Functions

### `getMetaTags()`

Returns formatted meta tags object:

```typescript
import { getMetaTags } from '@milo-me/site-config';

const metaTags = getMetaTags();
// {
//   keywords: ['Next.js', 'React', ...],
//   description: '...',
//   ...
// }
```

### `getOpenGraphTags()`

Returns Open Graph meta tags:

```typescript
import { getOpenGraphTags } from '@milo-me/site-config';

const ogTags = getOpenGraphTags();
// {
//   type: 'website',
//   locale: 'zh-TW',
//   url: 'https://www.michaello.me',
//   ...
// }
```

## Analytics Components

### Google Analytics

```typescript
import { GoogleAnalytics } from '@milo-me/site-config';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
```

### PostHog

```typescript
import { PostHog } from '@milo-me/site-config';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PostHog />
      </body>
    </html>
  );
}
```

## TypeScript Support

All configuration has full TypeScript type definitions:

```typescript
import type {
  SiteConfig,
  Author,
  SiteMetadata,
  SocialLinks,
  Analytics,
} from '@milo-me/site-config';

const customConfig: SiteConfig = {
  author: { name: 'John Doe', url: 'https://example.com' },
  site: {
    /* ... */
  },
  // ...
};
```

## File Structure

```
libs/site-config/
├── src/
│   ├── index.ts              # Main config and exports
│   ├── components/
│   │   ├── GoogleAnalytics.tsx
│   │   └── PostHog.tsx
│   └── types.ts              # TypeScript types
├── project.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Some values can be overridden with environment variables:

- `NEXT_PUBLIC_BASE_URL` - Override site URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL

```typescript
// Will use environment variable if available, otherwise default
const url = process.env.NEXT_PUBLIC_BASE_URL || siteConfig.site.url;
```

## Used By

- `apps/portfolio` - Main portfolio app
- `apps/blog` - Blog app
- `apps/lab/home` - Lab home app
- `apps/slidevs` - Presentations app

## Updating Configuration

To update site-wide configuration:

1. Edit `libs/site-config/src/index.ts`
2. Rebuild affected apps: `pnpm nx affected --target=build`
3. Changes will apply to all apps consuming this library

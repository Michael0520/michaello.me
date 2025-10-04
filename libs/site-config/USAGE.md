# @milo-me/site-config 使用說明

## 安裝

此 package 已在 monorepo 中自動配置，無需額外安裝。

## 在 Next.js App 中使用

### 1. Root Layout (app/layout.tsx)

```typescript
import { siteConfig, getMetaTags } from '@milo-me/site-config';

const metaTags = getMetaTags();

export const metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  keywords: metaTags.keywords,
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

### 2. 在組件中使用

```typescript
import { siteConfig } from '@milo-me/site-config';

export function Footer() {
  return (
    <footer>
      <p>{siteConfig.copyright}</p>
      <a href={siteConfig.social.github}>GitHub</a>
    </footer>
  );
}
```

### 3. 在頁面中使用

```typescript
import { siteConfig } from '@milo-me/site-config';

export const metadata = {
  title: `About - ${siteConfig.site.name}`,
  description: siteConfig.site.description,
};

export default function AboutPage() {
  return <h1>About {siteConfig.author.name}</h1>;
}
```

## 配置內容

### author
- `name`: 作者名稱
- `email`: 作者郵箱（可選）
- `url`: 作者網站

### site
- `name`: 網站名稱
- `title`: 網站標題
- `description`: 網站描述
- `url`: 網站 URL
- `locale`: 語言設定
- `keywords`: SEO 關鍵字

### social
- `github`: GitHub 連結
- `linkedin`: LinkedIn 連結
- `twitter`: Twitter 連結
- `rss`: RSS Feed 連結

### analytics
- `googleAnalyticsId`: Google Analytics ID
- `posthogApiKey`: PostHog API Key
- `posthogHost`: PostHog Host

## Helper Functions

### getMetaTags()
返回格式化的 meta tags 物件

### getOpenGraphTags()
返回 Open Graph meta tags 物件

## TypeScript 支援

所有配置都有完整的 TypeScript 類型定義：

```typescript
import type { SiteConfig, Author, SiteMetadata } from '@milo-me/site-config';
```

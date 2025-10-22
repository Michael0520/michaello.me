# Architecture Documentation

## 整體架構概覽

這是一個基於 **Next.js Multi-Zones** 的 Nx Monorepo 專案，使用單一網域 (`michaello.me`) 提供多個獨立部署的應用程式。

### 核心概念

```
michaello.me (單一網域)
├── / → Portfolio App (主應用)
├── /blog → Portfolio App (文章列表)
├── /posts → Blog App (文章詳細內容，透過 rewrite)
├── /lab → Lab Home App (透過 rewrite)
└── /talks → Slidevs App (透過 rewrite)
```

---

## 專案結構

```
.
├── apps/
│   ├── portfolio/          # 主要作品集網站 (主 Zone)
│   ├── blog/              # 部落格應用 (獨立 Zone)
│   ├── lab/home/          # Lab 專案首頁 (獨立 Zone)
│   └── slidevs/           # 簡報網站 (獨立 Zone)
│
├── libs/
│   ├── blog-metadata/     # 部落格 metadata 共享函式庫
│   ├── site-config/       # 網站全域設定
│   └── shared-ui/         # 共用 UI 元件 (shadcn/ui)
│
└── tools/                 # 開發工具和腳本
```

---

## Apps 詳細說明

### 1. Portfolio App (主應用)

**路徑**: `apps/portfolio/`
**網域**: `michaello.me` (主網域)
**部署**: Vercel (michaello-portfolio)

#### 職責

- 個人資訊展示 (關於我、經歷、專案)
- **部落格文章列表頁** (`/blog`)
- 導航到其他 apps (透過 rewrites)

#### 關鍵路由

```
/ - 主頁 (個人檔案)
/blog - 文章列表 (Featured + Latest，使用 blog-metadata)
```

#### 依賴

- `@milo-me/blog-metadata` - 文章 metadata
- `@milo-me/site-config` - 全域設定
- `@milo-me/shared-ui` - UI 元件

#### 重要配置

```javascript
// apps/portfolio/next.config.mjs
async rewrites() {
  return [
    // Blog zone - 所有 /posts 路由轉發到 Blog App
    { source: '/posts', destination: 'https://michaello-blog.vercel.app/posts' },
    { source: '/posts/:path*', destination: 'https://michaello-blog.vercel.app/posts/:path*' },

    // Lab zone
    { source: '/lab', destination: 'https://michaello-lab-home.vercel.app/lab' },
    { source: '/lab/:path*', destination: 'https://michaello-lab-home.vercel.app/lab/:path*' },

    // Slides zone
    { source: '/talks', destination: 'https://michaello-slides.vercel.app/talks' },
    { source: '/talks/:path*', destination: 'https://michaello-slides.vercel.app/talks/:path*' },
  ];
}
```

---

### 2. Blog App (部落格)

**路徑**: `apps/blog/`
**獨立網域**: `michaello-blog.vercel.app`
**透過主網域訪問**: `michaello.me/posts/*`
**部署**: Vercel (michaello-blog)

#### 職責

- **單一內容來源** (Single Source of Truth)
- 儲存所有部落格文章 (MDX 格式)
- 渲染完整文章內容
- 提供文章列表頁

#### 內容結構

```
apps/blog/content/posts/
├── backend/              # 後端相關文章
├── frontend/             # 前端相關文章
├── leetcode/             # LeetCode 解題
└── tech-talk/            # 技術討論
```

#### 關鍵路由

```
/posts - 所有文章列表 (by category)
/posts/[slug] - 文章詳細頁面 (完整 MDX 渲染)
```

#### 技術棧

- **Fumadocs** - MDX 文件系統
- **next-mdx-remote** - MDX 渲染
- **gray-matter** - Frontmatter 解析

---

### 3. Lab Home App

**路徑**: `apps/lab/home/`
**獨立網域**: `michaello-lab-home.vercel.app`
**透過主網域訪問**: `michaello.me/lab`
**部署**: Vercel (michaello-lab-home)

#### 職責

- 展示實驗性專案列表
- 導航到各個 Lab 子專案

#### Base Path

```javascript
// apps/lab/home/next.config.js
module.exports = {
  basePath: '/lab',
};
```

---

### 4. Slidevs App (簡報)

**路徑**: `apps/slidevs/`
**獨立網域**: `michaello-slides.vercel.app`
**透過主網域訪問**: `michaello.me/talks/*`
**部署**: Vercel (michaello-slides)

#### 職責

- 技術分享簡報
- 使用 Slidev 製作

#### Base Path

```javascript
// apps/slidevs/next.config.js
module.exports = {
  basePath: '/talks',
};
```

---

## Libs 詳細說明

### 1. blog-metadata

**路徑**: `libs/blog-metadata/`

#### 職責

從 Blog App 的 MDX 檔案提取 **僅 metadata**，供 Portfolio App 使用。

#### 為什麼需要這個函式庫？

- Portfolio App 只需要顯示文章列表 (title, description, date)
- 避免 Portfolio App 直接讀取 Blog App 的檔案系統
- 保持清晰的依賴關係和職責分離

#### 資料流程

```
Blog MDX Files (apps/blog/content/posts/**/*.mdx)
    ↓ (extract-metadata script)
posts-metadata.json (metadata only)
    ↓ (build to dist)
Portfolio App imports @milo-me/blog-metadata
```

#### Metadata Schema

```typescript
interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
  icon?: string;
}
```

#### 構建流程

```json
// libs/blog-metadata/project.json
{
  "targets": {
    "extract-metadata": {
      "command": "pnpm dlx tsx scripts/extract-metadata.ts",
      "inputs": ["{workspaceRoot}/apps/blog/content/posts/**/*.mdx"],
      "outputs": ["{projectRoot}/src/lib/posts-metadata.json"]
    },
    "build": {
      "executor": "@nx/js:tsc",
      "dependsOn": ["extract-metadata"]
    }
  }
}
```

#### 公開 API

```typescript
// 取得所有文章 metadata
getAllPosts(): PostMetadata[]

// 取得精選文章
getFeaturedPosts(limit = 3): PostMetadata[]

// 取得最新文章
getLatestPosts(limit = 5): PostMetadata[]

// 按分類取得文章
getPostsByCategory(category: string): PostMetadata[]

// 取得單一文章
getPostBySlug(slug: string): PostMetadata | undefined
```

---

### 2. site-config

**路徑**: `libs/site-config/`

#### 職責

集中管理全站設定，避免重複設定。

#### 內容

```typescript
export const siteConfig = {
  author: { name, url },
  site: { name, title, description, url, locale, keywords },
  social: { github, linkedin, rss },
  analytics: { googleAnalyticsId, posthogApiKey, posthogHost },
};
```

---

### 3. shared-ui

**路徑**: `libs/shared-ui/`

#### 職責

共用 UI 元件 (基於 shadcn/ui)

#### 新增元件

```bash
pnpm dlx shadcn@latest add button
# 元件會加到 libs/shared-ui/src/components/ui/
```

#### 使用

```typescript
import { Button } from '@milo-me/shared-ui';
```

---

## 開發工作流程

### 本機開發

#### 1. 安裝依賴

```bash
pnpm install
```

#### 2. 啟動開發伺服器

**單一 app:**

```bash
pnpm nx dev portfolio    # Port 3000
pnpm nx dev blog         # Port 3001
pnpm nx dev lab-home     # Port 3002
```

**所有 apps:**

```bash
pnpm dev  # 啟動所有 apps
```

#### 3. 構建

**單一 app:**

```bash
pnpm nx build portfolio --prod
pnpm nx build blog --prod
```

**所有 apps:**

```bash
pnpm build
```

#### 4. 程式碼品質檢查

```bash
pnpm lint              # ESLint
pnpm format            # Prettier
pnpm type-check        # TypeScript
```

---

## 部落格內容更新流程

### 1. 新增/編輯文章

在 Blog App 新增或編輯 MDX 檔案：

```bash
# 新增文章
apps/blog/content/posts/frontend/new-article.mdx
```

```yaml
---
title: 文章標題
description: 文章描述
date: 2025-01-15
category: frontend
featured: true
icon: lucide:code
---
文章內容...
```

### 2. 提取 Metadata

Blog 內容更新後，需要重新提取 metadata：

```bash
# 執行 metadata 提取
pnpm nx run blog-metadata:extract-metadata

# 構建 blog-metadata library
pnpm nx build blog-metadata
```

### 3. 構建 Portfolio App

Portfolio App 依賴 blog-metadata，需要重新構建：

```bash
pnpm nx build portfolio --prod
```

### 4. 構建 Blog App

```bash
pnpm nx build blog --prod
```

### 完整流程 (推薦)

```bash
# 一次執行所有必要步驟
pnpm nx run blog-metadata:extract-metadata && \
pnpm nx build blog-metadata && \
pnpm nx build portfolio --prod && \
pnpm nx build blog --prod
```

---

## 部署流程

### Vercel 部署配置

每個 app 都有獨立的 Vercel 專案：

| App       | Vercel 專案名稱     | 主網域       | 訪問路徑 |
| --------- | ------------------- | ------------ | -------- |
| Portfolio | michaello-portfolio | michaello.me | /        |
| Blog      | michaello-blog      | -            | /posts   |
| Lab Home  | michaello-lab-home  | -            | /lab     |
| Slidevs   | michaello-slides    | -            | /talks   |

### Portfolio App (主應用)

**Vercel 設定:**

```
Project: michaello-portfolio
Domain: michaello.me, www.michaello.me
Root Directory: (留空，使用 monorepo root)
Build Command: pnpm nx build portfolio --prod
Output Directory: apps/portfolio/.next
Framework: Next.js
```

**Environment Variables (可選):**

```
NEXT_PUBLIC_BASE_URL - Portfolio URL (auto-detected)
GITHUB_USERNAME - GitHub username
NEXT_PUBLIC_GA_ID - Google Analytics ID
NEXT_PUBLIC_POSTHOG_KEY - PostHog key
```

**重要:**

- Portfolio 使用 rewrites 將 `/posts`, `/lab`, `/talks` 路由到其他 apps
- `next.config.mjs` 中的 rewrite URLs 需要在部署其他 apps 後更新

---

### Blog App

**Vercel 設定:**

```
Project: michaello-blog
Domain: (無，透過 Portfolio rewrite)
Root Directory: (留空)
Build Command: pnpm nx build blog --prod
Output Directory: apps/blog/.next
Framework: Next.js
```

---

### Lab Home App

**Vercel 設定:**

```
Project: michaello-lab-home
Domain: (無，透過 Portfolio rewrite)
Root Directory: (留空)
Build Command: pnpm nx build lab-home --prod
Output Directory: apps/lab/home/.next
Framework: Next.js
```

---

### Slidevs App

**Vercel 設定:**

```
Project: michaello-slides
Domain: (無，透過 Portfolio rewrite)
Root Directory: (留空)
Build Command: pnpm nx build slidevs --prod
Output Directory: apps/slidevs/.next
Framework: Next.js
```

---

## 構建依賴關係

### Nx 依賴圖

```
Blog Content (apps/blog/content/posts/**/*.mdx)
    ↓
blog-metadata (extract + build)
    ↓
Portfolio App (使用 metadata 顯示列表)

Blog App (獨立，渲染完整內容)
```

### 構建順序

當 blog 內容更新時：

1. **Extract metadata** (自動在 blog-metadata build 時執行)
2. **Build blog-metadata library**
3. **Build Portfolio** (使用新的 metadata)
4. **Build Blog** (渲染新內容)

### Nx 快取

Nx 會根據 inputs 自動快取構建結果：

- Blog MDX 檔案未更新 → blog-metadata 不會重新構建
- blog-metadata 未更新 → Portfolio 可以使用快取

---

## 常見問題 (FAQ)

### Q1: 為什麼要分離 Portfolio 和 Blog？

**A:**

- **職責分離**: Portfolio 專注於個人資訊展示，Blog 專注於內容渲染
- **獨立部署**: 可以單獨更新 blog 內容而不影響 portfolio
- **效能**: Portfolio 只載入 metadata，不需要處理完整 MDX 內容
- **清晰架構**: 單一內容來源 (Blog)，避免重複和不一致

### Q2: 為什麼需要 blog-metadata library？

**A:**

- Portfolio App 需要顯示文章列表
- 直接讀取 Blog App 的檔案系統會產生跨 app 依賴
- Metadata library 提供清晰的資料介面和型別安全
- 構建時提取，執行時只需要 JSON

### Q3: 更新 blog 後忘記 extract metadata 會怎樣？

**A:**
Portfolio 會顯示舊的文章列表，但 Blog App 會顯示新內容。建議：

- 使用 Git hooks 或 CI/CD 自動執行
- 加入 portfolio build 的 dependsOn

### Q4: 如何新增 Lab 子專案？

**A:**

1. 建立新 app: `apps/lab/calculator/`
2. 設定 `basePath: '/lab/calculator'`
3. 在 Portfolio `next.config.mjs` 加入 rewrite
4. 更新 `apps/lab/home/` 的專案列表
5. 部署到 Vercel

### Q5: Multi-Zones 的缺點？

**A:**

- 需要管理多個 Vercel 專案
- Rewrites 增加一些延遲 (通常 < 50ms)
- 需要維護 rewrite URLs

**優點遠大於缺點:**

- 獨立部署和版本控制
- 更好的效能 (小的 bundle)
- 清晰的職責分離

---

## Nx 指令參考

### 專案管理

```bash
# 列出所有專案
pnpm nx show projects

# 查看專案依賴圖
pnpm nx graph

# 查看受影響的專案
pnpm nx affected --target=build
```

### 快取管理

```bash
# 清除快取
pnpm nx reset

# 查看快取狀態
pnpm nx show project portfolio
```

### 平行執行

```bash
# 構建所有受影響的專案
pnpm nx affected --target=build --parallel=3
```

---

## Git Commit 規範

### Conventional Commits

```
<type>(<scope>): <description>

[optional body]
```

### Scopes (必填)

```
blog, portfolio, lab-home, lab-calculator, lab-todo,
slidevs, shared-ui, site-config, blog-metadata, workspace, *
```

### Types

```
feat, fix, refactor, test, docs, chore, perf, style, build, ci
```

### 範例

```bash
feat(blog): add new blog post about React hooks
fix(portfolio): correct button hover state
refactor(*): separate blog content and metadata
chore(workspace): update dependencies
```

---

## 技術棧總覽

### 核心框架

- **Monorepo**: Nx 21.6.3
- **Framework**: Next.js 15.3.0 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.9.2

### 樣式

- **Tailwind CSS**: v4.0.0 (zero-config)
- **Component Library**: shadcn/ui

### 部落格

- **MDX**: Fumadocs v15.8.3
- **Content**: next-mdx-remote
- **Frontmatter**: gray-matter

### 開發工具

- **Linter**: ESLint 9.37.0
- **Formatter**: Prettier
- **Git Hooks**: Husky + lint-staged + commitlint

### 部署

- **Platform**: Vercel
- **Architecture**: Multi-Zones

---

## 維護檢查清單

### 每週

- [ ] 檢查 Vercel 部署狀態
- [ ] 檢查 analytics 資料

### 每月

- [ ] 更新依賴套件 (`pnpm update`)
- [ ] 檢查 Nx 快取大小 (`pnpm nx reset` 如果太大)
- [ ] 檢查並修復 Lighthouse 分數

### 重大更新時

- [ ] 更新 Next.js 版本
- [ ] 測試所有 apps 的構建
- [ ] 測試 multi-zone rewrites
- [ ] 更新此文件

---

## 相關文件

- [CLAUDE.md](./CLAUDE.md) - AI 開發助手指南
- [README.md](./README.md) - 專案總覽
- [Nx Documentation](https://nx.dev)
- [Next.js Multi-Zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones)

---

**Last Updated**: 2025-01-23
**Maintained by**: Michael Lo

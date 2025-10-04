# Multi-App Deployment Guide

此 Nx monorepo 包含 3 個 Next.js 應用程式，使用 **Subdomain 架構** 部署到不同的網域。

## 📁 應用程式結構

| App | Port | Domain | 用途 |
|-----|------|--------|------|
| **docs** | 3002 | `michaello.me` | Blog 主站 (Fumadocs + MDX) |
| **side-projects** | 3000 | `side.michaello.me` | Side Projects 展示 |
| **slidevs** | 3001 | `slides.michaello.me` | Slides 簡報展示 |

## 🚀 Vercel 部署步驟

### 1. 建立 3 個 Vercel 專案

在 Vercel Dashboard 中建立 3 個獨立專案：

#### 專案 1: docs (主站)
- **Project Name**: `milo-me-docs` (或你偏好的名稱)
- **Git Repository**: 連結到此 repo
- **Root Directory**: `apps/docs`
- **Build Command**: 自動偵測 (使用 `apps/docs/vercel.json`)
- **Output Directory**: 自動偵測 (`.next`)
- **Custom Domain**: `michaello.me`

#### 專案 2: side-projects
- **Project Name**: `milo-me-side-projects`
- **Git Repository**: 連結到此 repo (同一個)
- **Root Directory**: `apps/side-projects`
- **Build Command**: 自動偵測 (使用 `apps/side-projects/vercel.json`)
- **Output Directory**: 自動偵測 (`.next`)
- **Custom Domain**: `side.michaello.me`

#### 專案 3: slidevs
- **Project Name**: `milo-me-slidevs`
- **Git Repository**: 連結到此 repo (同一個)
- **Root Directory**: `apps/slidevs`
- **Build Command**: 自動偵測 (使用 `apps/slidevs/vercel.json`)
- **Output Directory**: 自動偵測 (`.next`)
- **Custom Domain**: `slides.michaello.me`

### 2. 設定 Root Directory

**重要**: 每個 Vercel 專案都必須設定正確的 Root Directory：

1. 進入 Vercel 專案 → Settings → General
2. 找到 **Root Directory** 設定
3. 設定對應的 app 路徑：
   - docs: `apps/docs`
   - side-projects: `apps/side-projects`
   - slidevs: `apps/slidevs`

### 3. 配置 Custom Domain

在每個 Vercel 專案中：

1. 進入 Settings → Domains
2. 新增對應的 domain：
   - docs: `michaello.me` (或 `www.michaello.me`)
   - side-projects: `side.michaello.me`
   - slidevs: `slides.michaello.me`

### 4. DNS 設定

在你的 DNS 提供商 (如 Cloudflare/Namecheap) 設定：

```dns
# 主域名 (A Record 或 CNAME)
michaello.me      →   76.76.21.21  (Vercel IP) 或 cname.vercel-dns.com

# Subdomain (CNAME)
side.michaello.me   →   cname.vercel-dns.com
slides.michaello.me →   cname.vercel-dns.com
```

**提示**: Vercel 會在 Domain 設定頁面顯示正確的 DNS 設定值。

## 📋 Vercel 專案配置檔

每個 app 都有獨立的 `vercel.json`:

- `/apps/docs/vercel.json`
- `/apps/side-projects/vercel.json`
- `/apps/slidevs/vercel.json`

這些檔案包含：
- Build command (Nx-specific)
- Output directory
- Framework detection

## 🔄 部署流程

### 自動部署 (Git Push)

當你 push 到 GitHub 時，所有 3 個 Vercel 專案都會自動觸發部署。

### 手動部署

```bash
# Deploy 特定 app
vercel --cwd apps/docs
vercel --cwd apps/side-projects
vercel --cwd apps/slidevs

# Production deployment
vercel --cwd apps/docs --prod
```

## 🧪 本地測試

```bash
# 開發環境 (所有 app)
pnpm dev

# 或單獨運行
pnpm nx dev docs         # localhost:3002
pnpm nx dev side-projects # localhost:3000
pnpm nx dev slidevs      # localhost:3001

# Production build 測試
pnpm nx build docs --prod
pnpm nx build side-projects --prod
pnpm nx build slidevs --prod
```

## ⚠️ 注意事項

1. **Root Directory 設定**: 確保每個 Vercel 專案的 Root Directory 正確設定
2. **Environment Variables**: 在每個 Vercel 專案分別設定環境變數
3. **DNS 生效時間**: DNS 變更可能需要 24-48 小時生效
4. **Branch Deployment**: 可以為不同 branch 設定不同的部署規則

## 🔗 相關連結

- [Vercel Monorepo 文件](https://vercel.com/docs/monorepos)
- [Nx Next.js Plugin](https://nx.dev/packages/next)
- [Fumadocs 文件](https://fumadocs.vercel.app)

## 📝 Legacy 配置

根目錄的 `/vercel.json` 已標記為 LEGACY，僅保留作為參考。

實際部署請使用各 app 目錄下的 `vercel.json`。

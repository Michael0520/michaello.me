# Vercel Deployment Guide

This guide walks you through deploying the Nx monorepo with Next.js Multi-Zones to Vercel.

## Architecture Overview

This monorepo uses **Next.js Multi-Zones** to serve multiple apps under a single domain (`michaello.me`):

- **Portfolio** (Main Zone) - `michaello.me/`
- **Lab** - `michaello.me/lab/` (via rewrite)
- **Slides** - `michaello.me/slides/` (via rewrite)

## Deployment Steps

### Step 1: Deploy Lab Home

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. **Project Name**: `michaello-lab-home`
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave **empty** (monorepo root)
   - **Build Command**: `pnpm nx build lab-home --prod`
   - **Output Directory**: `apps/lab/home/.next`
   - **Install Command**: `pnpm install`
5. **Environment Variables**: None required
6. Click **Deploy**
7. **Save the deployment URL** (e.g., `michaello-lab-home.vercel.app`)

### Step 2: Deploy Slides

1. Create a new project in Vercel
2. Import the same GitHub repository
3. **Project Name**: `michaello-slides`
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave **empty**
   - **Build Command**: `pnpm nx build slidevs --prod`
   - **Output Directory**: `apps/slidevs/.next`
   - **Install Command**: `pnpm install`
5. Click **Deploy**
6. **Save the deployment URL** (e.g., `michaello-slides.vercel.app`)

### Step 3: Update Portfolio Rewrites

Before deploying the portfolio app, you need to update the rewrite URLs in `apps/portfolio/next.config.js`:

```javascript
async rewrites() {
  return [
    // Lab zone rewrites
    {
      source: '/lab',
      destination: 'https://michaello-lab-home.vercel.app/lab', // ← Update this
    },
    {
      source: '/lab/:path*',
      destination: 'https://michaello-lab-home.vercel.app/lab/:path*', // ← Update this
    },
    // Slides zone rewrites
    {
      source: '/slides',
      destination: 'https://michaello-slides.vercel.app/slides', // ← Update this
    },
    {
      source: '/slides/:path*',
      destination: 'https://michaello-slides.vercel.app/slides/:path*', // ← Update this
    },
  ];
}
```

**Commit and push the changes:**

```bash
git add apps/portfolio/next.config.js
git commit -m "chore(portfolio): update Multi-Zones rewrite URLs for Vercel deployment"
git push
```

### Step 4: Deploy Portfolio (Main Zone)

1. Create a new project in Vercel
2. Import the same GitHub repository
3. **Project Name**: `michaello-portfolio`
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave **empty**
   - **Build Command**: `pnpm nx build portfolio --prod`
   - **Output Directory**: `apps/portfolio/.next`
   - **Install Command**: `pnpm install`
5. Click **Deploy**

### Step 5: Configure Custom Domain

1. Go to `michaello-portfolio` project settings
2. Navigate to **Domains**
3. Add your custom domains:
   - `michaello.me`
   - `www.michaello.me`
4. Vercel will provide DNS records

### Step 6: Update DNS (Gandi)

1. Log in to [Gandi](https://admin.gandi.net/)
2. Go to **Domain names** → `michaello.me`
3. Click **DNS Records**
4. Add the following records:

**A Record (apex domain):**
```
Type: A
Name: @
TTL: 300
Value: 76.76.21.21
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
TTL: 300
Value: cname.vercel-dns.com.
```

5. Save changes
6. Wait 5-30 minutes for DNS propagation

### Step 7: Verify Deployment

After DNS propagation, test the following URLs:

- ✅ `https://michaello.me/` - Portfolio homepage (blog list)
- ✅ `https://michaello.me/posts/frontend/react-hooks` - Blog article
- ✅ `https://michaello.me/projects` - Projects page
- ✅ `https://michaello.me/talks` - Talks page
- ✅ `https://michaello.me/lab` - Lab homepage
- ✅ `https://michaello.me/slides` - Slides homepage

## Vercel Projects Summary

| Project Name | Domain | App | Build Command |
|--------------|--------|-----|---------------|
| michaello-portfolio | michaello.me | apps/portfolio | `pnpm nx build portfolio --prod` |
| michaello-lab-home | (rewrite) | apps/lab/home | `pnpm nx build lab-home --prod` |
| michaello-slides | (rewrite) | apps/slidevs | `pnpm nx build slidevs --prod` |

## Environment Variables

Currently, no environment variables are required for any of the apps. If you add analytics or other services in the future, configure them in Vercel project settings.

## Continuous Deployment

All three Vercel projects are connected to your GitHub repository. When you push to `main`:

1. Vercel automatically detects changes
2. Runs `nx affected` to determine which apps changed
3. Only rebuilds and redeploys affected apps

## Troubleshooting

### Multi-Zones Not Working

If `/lab` or `/slides` routes return 404:

1. Check that lab-home and slides are deployed successfully
2. Verify the rewrite URLs in `apps/portfolio/next.config.js` match the actual Vercel URLs
3. Redeploy the portfolio app after updating rewrites

### Build Failures

Check the build logs in Vercel. Common issues:

- **Missing dependencies**: Run `pnpm install` locally and commit `pnpm-lock.yaml`
- **Type errors**: Run `pnpm type-check` locally
- **Nx cache issues**: Clear cache with `pnpm nx reset` locally

### DNS Not Resolving

- Wait up to 48 hours for full DNS propagation (usually 5-30 minutes)
- Check DNS with `dig michaello.me` or https://dnschecker.org/
- Verify DNS records in Gandi match Vercel's requirements

## Adding New Lab Projects

To add a new lab project (e.g., calculator):

1. Create the app structure: `apps/lab/calculator/`
2. Configure `basePath: '/lab/calculator'` in `next.config.js`
3. Deploy to Vercel as a new project
4. Add rewrite in `apps/portfolio/next.config.js`
5. Redeploy portfolio app

## Cost Optimization

All three apps can run on Vercel's **Free Tier** with the following limits:

- 100GB bandwidth/month
- Automatic HTTPS
- Unlimited deployments

If you exceed limits, consider Vercel Pro ($20/month) or self-hosting.

## Security

- All apps use HTTPS automatically via Vercel
- No environment variables containing secrets
- CORS configured for Multi-Zones communication

## Monitoring

Monitor deployments in Vercel Dashboard:

- **Analytics**: Track page views and performance
- **Logs**: View build and runtime logs
- **Insights**: See Core Web Vitals and performance metrics

---

**Last Updated**: 2025-10-05

For questions or issues, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Multi-Zones](https://nextjs.org/docs/pages/guides/multi-zones)
- [Nx Documentation](https://nx.dev/)

//@ts-check

import { composePlugins, withNx } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  devIndicators: false,
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.chanhdai.com',
        port: '',
      },
    ],
    qualities: [75, 100],
  },
  async rewrites() {
    return [
      // Blog zone rewrites
      {
        source: '/blog',
        destination: 'https://michaello-blog.vercel.app/blog',
      },
      {
        source: '/blog/:path*',
        destination: 'https://michaello-blog.vercel.app/blog/:path*',
      },
      // Lab zone rewrites
      {
        source: '/lab',
        destination: 'https://michaello-lab-home.vercel.app/lab',
      },
      {
        source: '/lab/:path*',
        destination: 'https://michaello-lab-home.vercel.app/lab/:path*',
      },
      // Slides zone rewrites
      {
        source: '/slides',
        destination: 'https://michaello-slides.vercel.app/slides',
      },
      {
        source: '/slides/:path*',
        destination: 'https://michaello-slides.vercel.app/slides/:path*',
      },
      // Portfolio internal MDX rewrites
      {
        source: '/blog/:slug.mdx',
        destination: '/blog.mdx/:slug',
      },
      {
        source: '/components/:slug.mdx',
        destination: '/blog.mdx/:slug',
      },
    ];
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);

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
        source: '/posts',
        destination: 'https://michaello-blog.vercel.app/posts',
      },
      {
        source: '/posts/:path*',
        destination: 'https://michaello-blog.vercel.app/posts/:path*',
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
        source: '/talks',
        destination: 'https://michaello-slides.vercel.app/talks',
      },
      {
        source: '/talks/:path*',
        destination: 'https://michaello-slides.vercel.app/talks/:path*',
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

//@ts-check

import { composePlugins, withNx } from '@nx/next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote', '@milo-me/blog-metadata'],
  devIndicators: false,
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // Add alias for blog-metadata library
    config.resolve.alias['@milo-me/blog-metadata'] = path.resolve(
      __dirname,
      '../../dist/libs/blog-metadata/src/index.js'
    );
    return config;
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
    ];
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);

//@ts-check

import { composePlugins, withNx } from '@nx/next';
import { createMDX } from 'fumadocs-mdx/next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = createMDX();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote', '@milo-me/blog-metadata', '@milo-me/site-config', 'fumadocs-core', 'fumadocs-mdx'],
  devIndicators: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'standalone',
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
};

const plugins = [withNx];

export default composePlugins(...plugins)(withMDX(nextConfig));

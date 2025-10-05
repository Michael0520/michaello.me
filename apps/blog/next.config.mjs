//@ts-check

import { composePlugins, withNx } from '@nx/next';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async rewrites() {
    return [
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
    ];
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(withMDX(nextConfig));

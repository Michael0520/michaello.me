import { composePlugins, withNx } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  basePath: '/lab',
  assetPrefix: '/lab',
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);

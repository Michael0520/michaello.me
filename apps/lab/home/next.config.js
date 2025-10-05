const { composePlugins, withNx } = require('@nx/next');

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

module.exports = composePlugins(...plugins)(nextConfig);

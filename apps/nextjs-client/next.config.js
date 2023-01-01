//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  // productionBrowserSourceMaps: true,
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      constants: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

module.exports = withNx(nextConfig);

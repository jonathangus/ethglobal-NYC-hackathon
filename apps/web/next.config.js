const withTM = require('next-transpile-modules')(['ui', 'web3-config']);

module.exports = withTM({
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});

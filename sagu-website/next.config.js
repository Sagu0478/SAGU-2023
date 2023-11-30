/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  "@square/web-sdk",
  'react-square-web-payments-sdk',
]);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
    ],
  },
};

const squareConfig = withTM({
  experimental: {
    esmExternals: "loose",
  },
});

module.exports = nextConfig, squareConfig;

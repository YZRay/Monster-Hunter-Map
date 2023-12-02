const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/SelectionPage",
        destination: "/equipment",
        permanent: true,
      },
    ];
  },
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);

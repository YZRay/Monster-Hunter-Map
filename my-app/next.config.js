/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode : false,
    async redirects() {
      return [
          {
              source: '/SelectionPage',
              destination: '/equipment',
              permanent: true,
          },
      ];
  },
}

module.exports = nextConfig;

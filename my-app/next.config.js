/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/zhTW",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "query", key: "lng" }],
        destination: "/:lng/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    eventSerial: "2",
  },
};

module.exports = nextConfig;

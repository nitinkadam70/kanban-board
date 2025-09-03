/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // ✅ Only valid experimental flags for Next.js 15 go here
    turbo: {
      rules: {},
    },
  },
};

export default nextConfig;

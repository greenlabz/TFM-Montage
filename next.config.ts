import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

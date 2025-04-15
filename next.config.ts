import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "productionBrowserSourceMaps": true,
  "reactStrictMode": true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;

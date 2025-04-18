import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "productionBrowserSourceMaps": true,
  "reactStrictMode": true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
  },
};

export default nextConfig;

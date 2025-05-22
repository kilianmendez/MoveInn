import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    unoptimized: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { join } from 'path';

const nextConfig: NextConfig = {
    webpack(config) {
    config.resolve.alias['@'] = join(__dirname, 'src');
    return config;
  },
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

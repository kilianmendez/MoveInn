import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {

    unoptimized: true,
  },
  reactStrictMode: false,
<<<<<<< Updated upstream
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    
=======
  eslint: {
    ignoreDuringBuilds: true,
>>>>>>> Stashed changes
  },
};

export default nextConfig;

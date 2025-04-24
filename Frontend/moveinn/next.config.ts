import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7023",
        pathname: "/accommodations/**",
      },
    ],
  },
};

export default nextConfig;

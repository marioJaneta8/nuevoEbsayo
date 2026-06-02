import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bd2xkbbq3s.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
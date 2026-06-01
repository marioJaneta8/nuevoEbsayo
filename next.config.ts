import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75,85,100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Por si acaso usas el dominio antiguo
      },
      {
        protocol: "https",
        hostname: "ufs.sh",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
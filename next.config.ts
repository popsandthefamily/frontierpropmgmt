import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "rentwithfrontier.com" },
    ],
  },
};

export default nextConfig;

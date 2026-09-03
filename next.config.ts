import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Owner documents are uploaded through a server action, and a scanned
    // 1099 or an inspection photo set easily exceeds the 1 MB default.
    serverActions: { bodySizeLimit: "25mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "rentwithfrontier.com" },
    ],
  },
  async redirects() {
    return [
      // The flat-fee Co-Host plan was retired in favour of Local Services.
      // Permanent so the old URL's ranking history follows it.
      { source: "/co-host", destination: "/local-services", permanent: true },
    ];
  },
};

export default nextConfig;

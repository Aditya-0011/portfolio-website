import "@/lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongodb"],
  images: { remotePatterns: [{ hostname: "**" }], minimumCacheTTL: 2678400 },
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

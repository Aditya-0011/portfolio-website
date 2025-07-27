import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
export default nextConfig;

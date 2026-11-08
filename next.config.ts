import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { withRedact } from "@tanstack/redact/next";

import { parseEnv } from "./lib/env-schema";

parseEnv();

const isDev = process.env.NODE_ENV !== "production";

const workspaceRoot = path.resolve(process.cwd(), "../..");
const inBunWorkspace = fs.existsSync(
  path.join(workspaceRoot, "node_modules", ".bun"),
);

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://challenges.cloudflare.com",
    "https://www.clarity.ms https://*.clarity.ms",
    "https://www.googletagmanager.com",
    "https://va.vercel-scripts.com",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    isDev ? "ws: wss:" : "",
    "https://challenges.cloudflare.com",
    "https://*.clarity.ms https://c.bing.com",
    "https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
    "https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  ]
    .filter(Boolean)
    .join(" "),
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isDev ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  ...(inBunWorkspace
    ? {
        turbopack: { root: workspaceRoot },
        outputFileTracingRoot: workspaceRoot,
      }
    : {}),
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "svgl.app" },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon@*/icons/**",
      },
    ],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      { source: "/resume", destination: "/resume.pdf", permanent: false },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
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

export default withRedact(nextConfig);

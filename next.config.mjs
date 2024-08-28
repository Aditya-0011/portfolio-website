/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.jsdelivr.net" }],
  },
};

export default nextConfig;

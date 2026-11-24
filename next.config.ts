import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Admin image uploads (up to 8 MB) and job-application CVs (up to 5 MB) go through Server Actions
    serverActions: { bodySizeLimit: "9mb" },
    proxyClientMaxBodySize: "9mb",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

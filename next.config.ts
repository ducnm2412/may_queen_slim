import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90, 95],
    deviceSizes: [390, 430, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
  cacheComponents: true,
  partialPrefetching: true,
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

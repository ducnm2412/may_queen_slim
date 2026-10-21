import type { NextConfig } from "next";
import { SLUGS } from "./src/lib/routes";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 80, 85, 90, 95],
    minimumCacheTTL: 60,
    localPatterns: [
      { pathname: "/img/**", search: "" },
      { pathname: "/img/hero/**", search: "?v=2" },
    ],
    deviceSizes: [390, 430, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
  // URL tiếng Anh dùng chung trang với URL tiếng Việt
  async rewrites() {
    return SLUGS.flatMap(([vi, en]) => [
      { source: `/${en}`, destination: `/${vi}` },
      { source: `/${en}/:path*`, destination: `/${vi}/:path*` },
    ]);
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

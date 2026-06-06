import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimization ──
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        // README cover images extracted from repos
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    // Cache optimized images for 1 year — GitHub avatars and project images
    // rarely change; the GitHub avatar URL includes ?v=4 which busts cache
    // when the avatar actually changes.
    minimumCacheTTL: 31536000,
    formats: ["image/webp", "image/avif"],
    qualities: [75, 85],
  },

  // ── Performance: enable compression ──
  compress: true,

  // ── Optimize production builds ──
  productionBrowserSourceMaps: false,

  // ── SWR cache headers for static assets ──
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },

  // ── Configure Turbopack (Next.js 16+ default) ──
  turbopack: {
    resolveAlias: {},
  },

  // ── Optimize package imports to reduce bundle size ──
  // Tree-shakes large icon/component libraries so only used exports are bundled
  experimental: {
    optimizePackageImports: ["lucide-react", "embla-carousel-react"],
  },
};

export default nextConfig;

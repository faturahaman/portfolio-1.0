import type { NextConfig } from "next";

// Assets under public/ are served by filename with no content hash, so they
// can't be cached `immutable` — a swapped avatar would be stuck in browser
// caches for a year. A week of freshness plus a month of stale-while-revalidate
// gets most of the benefit while still letting replacements roll out.
const STATIC_ASSET_CACHE = "public, max-age=604800, stale-while-revalidate=2592000";

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
    // Cache optimized images for 1 year — entries are keyed by source URL +
    // width + quality, so a changed source produces a different cache entry.
    minimumCacheTTL: 31536000,
    formats: ["image/webp", "image/avif"],
    // Allow-list of `quality` values next/image may be asked for. Keep it tight:
    // every extra value is another variant the optimizer can be made to generate.
    // 75 is next/image's default; 80 is what the hero avatars request.
    qualities: [75, 80],
  },

  // ── Performance: enable compression ──
  compress: true,

  // ── Don't leak the framework in a response header ──
  poweredByHeader: false,

  // ── Security + caching headers ──
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Files under public/ are otherwise served as `max-age=0`, so the
        // avatar and CV get revalidated on every navigation.
        source: "/:file*.(png|jpg|jpeg|webp|avif|gif|svg|ico|pdf|woff|woff2)",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
    ];
  },

  // ── Optimize production builds ──
  productionBrowserSourceMaps: false,

  // ── Optimize package imports to reduce bundle size ──
  // Tree-shakes large icon/component libraries so only used exports are bundled
  experimental: {
    optimizePackageImports: ["lucide-react", "embla-carousel-react"],
  },
};

export default nextConfig;

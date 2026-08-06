/**
 * Single source of truth for site-level constants that were previously
 * duplicated across layout.tsx, the video-editor page, sitemap.ts and robots.ts.
 */

export const BASE_URL = "https://riffatur.com"

/**
 * Social preview card. 1200x630 is the aspect ratio every platform crops from —
 * the old asset was a 956x1087 portrait logo declared as 512x512, so previews
 * were both mis-sized and letterboxed.
 */
export const OG_IMAGE = {
  url: `${BASE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "Muhamad Riffa Faturahman — Web Developer & Video Editor, Bogor Indonesia",
  type: "image/png",
} as const

/**
 * Fixed build-time stamp for `lastModified` in the sitemap. Using `new Date()`
 * there would tell crawlers the content changed on every single request, which
 * trains them to ignore the signal.
 */
export const CONTENT_LAST_MODIFIED = new Date("2026-08-06T00:00:00.000Z")

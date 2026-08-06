import { MetadataRoute } from "next";
import { BASE_URL, CONTENT_LAST_MODIFIED } from "@/lib/site";

/**
 * Only real, separately-addressable pages belong here.
 *
 * The previous version listed six `#fragment` URLs (`/#about`, `/#projects`, …).
 * Fragments are not distinct documents: crawlers strip them, so those entries
 * collapsed into six duplicates of `/` and turned a two-page sitemap into
 * mostly noise. In-page sections are discovered through the BreadcrumbList
 * JSON-LD and the nav links instead.
 *
 * `lastModified` is a fixed stamp rather than `new Date()` — a timestamp that
 * changes on every build tells crawlers the content changed when it didn't,
 * which trains them to stop trusting the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/video-editor`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}

import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // One wildcard rule. The previous per-crawler list said exactly the
        // same thing as the wildcard, and a named group *overrides* the
        // wildcard rather than adding to it — so it was duplication that could
        // silently drift out of sync.
        //
        // `/_next/` is deliberately NOT disallowed: it serves the CSS and JS
        // Googlebot needs to render the page. Blocking it makes Google index a
        // blank shell and it can't evaluate Core Web Vitals either. `/_next/image`
        // lives there too, so blocking it also de-indexes every optimised image.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all major crawlers with no restrictions
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Slurp", "Baiduspider"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        // General wildcard rule
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://riffatur.com/sitemap.xml",
    host: "https://riffatur.com",
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The new site welcomes both traditional search crawlers and answer engines
// (ChatGPT, Gemini, Claude, Perplexity, etc.) so the practice is discoverable
// wherever patients look. Adjust here if policy changes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

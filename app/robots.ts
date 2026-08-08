import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The new site welcomes both traditional search crawlers and answer engines
// (ChatGPT, Gemini, Claude, Perplexity, etc.) so the practice is discoverable
// wherever patients look. Adjust here if policy changes.
// AI / answer-engine crawlers. The rest of the site is intentionally open to
// these (good AEO), but the Fees page is excluded from them specifically.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines: crawl everything except /api. They are still
      // allowed to fetch /fees so they can read its `noindex` directive (which
      // keeps it out of the index without a robots.txt block).
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI answer engines: allowed across the site, but not the Fees page.
      {
        userAgent: aiBots,
        disallow: ["/fees", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

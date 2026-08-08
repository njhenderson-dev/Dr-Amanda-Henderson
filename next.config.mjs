/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// Redirect map (Squarespace → new site).
//
// Skin-cancer and cosmetic content lived only inside a section of the old
// homepage / "/services" page — there was no standalone skin/cosmetic URL to
// retire, so no misleading redirect is created. See MIGRATION-PLAN.md §5.
//
// All redirects are single-hop 301s (permanent) to avoid redirect chains.
// ---------------------------------------------------------------------------

const permanent = true;

const redirects = async () => [
  // Old /services duplicated the homepage → consolidate to canonical home.
  { source: "/services", destination: "/", permanent },

  // Pillar pages moved to clean, consistent slugs.
  { source: "/womenshealth", destination: "/womens-health", permanent },
  { source: "/paediatrics", destination: "/childrens-health", permanent },

  // Articles moved from /amanda-henderson-articles/* to /articles/*.
  { source: "/amanda-henderson-articles", destination: "/articles", permanent },
  {
    source: "/amanda-henderson-articles/:slug",
    destination: "/articles/:slug",
    permanent,
  },

  // Common alternates / safety nets.
  { source: "/book", destination: "/contact", permanent },
  { source: "/blog", destination: "/articles", permanent },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return redirects();
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

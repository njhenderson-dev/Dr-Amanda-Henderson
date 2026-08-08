/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// Redirect map (Squarespace → new site).
//
// Skin-cancer and cosmetic content lived only inside a section of the old
// homepage / "/services" page — there was no standalone skin/cosmetic URL to
// retire, so no misleading redirect is created. See MIGRATION-PLAN.md §5.
//
// All redirects are single-hop 301s to avoid redirect chains. We set an
// explicit statusCode of 301 (rather than `permanent: true`, which Next emits
// as 308) to match the migration spec and maximise crawler/tooling
// compatibility.
// ---------------------------------------------------------------------------

const s301 = 301;

const redirects = async () => [
  // Old /services duplicated the homepage → consolidate to canonical home.
  { source: "/services", destination: "/", statusCode: s301 },

  // Pillar pages moved to clean, consistent slugs.
  { source: "/womenshealth", destination: "/womens-health", statusCode: s301 },
  { source: "/paediatrics", destination: "/childrens-health", statusCode: s301 },

  // Articles moved from /amanda-henderson-articles/* to /articles/*.
  { source: "/amanda-henderson-articles", destination: "/articles", statusCode: s301 },
  {
    source: "/amanda-henderson-articles/:slug",
    destination: "/articles/:slug",
    statusCode: s301,
  },

  // Common alternates / safety nets.
  { source: "/book", destination: "/contact", statusCode: s301 },
  { source: "/blog", destination: "/articles", statusCode: s301 },
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
      {
        // Keep the Fees page out of search / AI indexes (belt-and-braces with
        // the page's noindex metadata and robots.txt). Patients reach it via
        // the site navigation, not search.
        source: "/fees",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noai, noimageai",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

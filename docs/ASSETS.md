# Images & assets

The site currently uses **one genuine photo** — Dr Henderson's portrait — plus
tasteful Unsplash stock on the four pillar pages (migrated from the old site).
Replacing the stock with real photography of Amanda / the practice is the single
biggest visual/trust upgrade. **Do not source or generate new stock images** —
only drop in real photos supplied by the practice.

## Where each image is used

| Image (in `/public/images/`) | Used on | Replace with |
|---|---|---|
| `dr-amanda-henderson-640.webp`, `-960.webp` | Homepage hero, About page (`components/Portrait.tsx`) | (already real — keep, or a newer portrait) |
| `og-amanda.jpg` (1200×630) | Social share card sitewide | A branded 1200×630 card, ideally featuring Amanda |
| `womens-health-{800,1200}.webp` | Women's Health hub header | Real/edited practice or on-brand photo |
| `pregnancy-{800,1200}.webp` | Pregnancy hub header | " |
| `children-{800,1200}.webp` | Children's Health hub header | " |
| `lifestyle-{800,1200}.webp` | General GP Care hub header | " |
| `mens-health-{800,1200}.webp` | (available, general GP) | " |
| `logo.png` (600×600) | Article `publisher.logo` in schema | Practice logo/monogram if available |
| `_archive/*.webp` | Not shown — full-size originals kept for reference | — |

Article header/share images are chosen **by category** in
`lib/schema.ts` → `articleImage()`, so swapping the pillar images updates
article previews too.

## How to add a new image (keep the responsive pipeline)

The images were produced by `scripts/fetch-images.mjs` using **sharp**. For a
new source image, generate the same responsive derivatives:

- **Wide (hub/article) images:** crop to 3:2, output WebP at widths **800** and
  **1200** (`<name>-800.webp`, `<name>-1200.webp`), quality ~80.
- **Portrait:** crop 4:5, WebP at **640** and **960**.
- **Social card (`og-amanda.jpg`):** 1200×630 JPEG, quality ~84.

Keep the existing file names so no code changes are needed. Put full-size
originals in `/public/images/_archive/`. All images need meaningful `alt` text
(pillar alts live in `lib/site.ts` `serviceAreas[].image.alt`).

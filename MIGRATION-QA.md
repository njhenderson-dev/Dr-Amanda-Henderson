# Migration QA & Launch Plan

Companion to `MIGRATION-PLAN.md`. Run this before switching DNS to the new site.

---

## A. Redirect verification (old → new)

All redirects are single‑hop **301s** defined in `next.config.mjs`. Verify each returns `301` to the target (no chains, no 302s):

| Old URL | Expected 301 target |
|---|---|
| `/services` | `/` |
| `/womenshealth` | `/womens-health` |
| `/paediatrics` | `/childrens-health` |
| `/amanda-henderson-articles` | `/articles` |
| `/amanda-henderson-articles/<slug>` | `/articles/<slug>` (all 29) |
| `/book` | `/contact` |
| `/blog` | `/articles` |

Retained (expect `200`): `/`, `/pregnancy-care`, `/contact`.
Retired (expect `404`, no redirect): `/cart`.

Quick check after deploy:
```bash
for u in /services /womenshealth /paediatrics /amanda-henderson-articles \
  /amanda-henderson-articles/understanding-what-causes-heavy-periods; do
  curl -sI "https://dramandahenderson.com$u" | grep -iE "HTTP|location";
done
```

## B. Skin cancer / cosmetic removal — audit trail

| Item | Old location | Handling | Redirect? |
|---|---|---|---|
| "Skin checks and cosmetic medicine" section | homepage `/` + `/services` | Removed; section not recreated | No dedicated URL existed → **no redirect** (parent URLs survive with new content) |
| Full body skin checks / biopsies / excision of skin cancers | same section | Removed from copy & schema | n/a |
| Anti‑wrinkle injections / cosmetic medicine | same section | Removed | n/a |
| Professional Certificate in Skin Cancer Medicine | credentials | Removed from copy & `knowsAbout` | n/a |
| Promotional skin‑cancer/cosmetic lines in articles | ~2–3 article intros | Reworded/removed during migration; medical education (acne/eczema/psoriasis) retained | n/a |

**No skin/cosmetic URL was ever indexed as a standalone page**, so retirement created **zero broken URLs and zero misleading redirects**. Confirm post‑launch in Search Console that no unexpected skin/cosmetic URL 404s (add a 301 only if a genuinely relevant destination exists).

## C. Per‑page SEO elements (spot‑check every template)

- [ ] Unique `<title>` and meta description
- [ ] Canonical URL present and self‑referential (correct host, no trailing slash)
- [ ] Exactly one `<h1>`; logical heading order
- [ ] Open Graph + Twitter card tags
- [ ] JSON‑LD present and valid (see D)
- [ ] `index,follow` on production
- [ ] Descriptive link text; images have `alt`

## D. Structured data (validate with Google Rich Results Test / Schema validator)

- [ ] Physician + Person (`/#physician`) — sitewide graph
- [ ] MedicalClinic (`/#clinic`)
- [ ] WebSite (`/#website`)
- [ ] BreadcrumbList on pillar/article/about/contact pages
- [ ] MedicalWebPage + FAQPage on pillar pages
- [ ] Article (MedicalWebPage) on each article; author/reviewedBy = Dr Amanda Henderson; datePublished/dateModified present
- [ ] Blog + BlogPosting on `/articles`
- [ ] No invented ratings/reviews/awards; no skin/cosmetic attributes

## E. Technical

- [ ] `sitemap.xml` lists only live indexable URLs (no retired/skin URLs) — 8 static/pillar + 29 articles
- [ ] `robots.txt` allows crawling + answer engines; points to sitemap
- [ ] Single canonical host resolves (www → apex or vice‑versa, one 301)
- [ ] HTTPS enforced; HTTP → HTTPS
- [ ] Custom 404 renders and links back into the site
- [ ] Security headers present (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`)
- [ ] No `noindex` left on production; **staging is noindex/password‑protected**

## F. Content & links

- [ ] All 29 articles migrated with real content, author + dates
- [ ] Internal links resolve (pillars ↔ articles ↔ about ↔ contact)
- [ ] External links: HotDoc booking, maps, RHW, healthdirect — all valid, `rel="noopener"`
- [ ] `tel:` links dial correctly; booking opens HotDoc
- [ ] No links to retired skin/cosmetic content anywhere

## G. Performance (target Core Web Vitals)

- [ ] LCP < 2.5s · CLS < 0.1 · INP < 200ms
- [ ] Static/SSR HTML; minimal client JS (First Load JS ~106 kB baseline)
- [ ] Self‑hosted fonts (no layout shift), `display: swap`
- [ ] **Replace placeholder portrait/OG art with optimised real photography** (AVIF/WebP, correct sizes) — see H
- [ ] Below‑fold images lazy‑loaded once real images added

## H. Assets to supply before launch (blockers)

- [x] ~~Real photography of Dr Amanda Henderson~~ — migrated to `public/images/` (hero, about, OG); `Portrait.tsx` now renders the real photo.
- [x] ~~Migrate legitimate images off the Squarespace CDN~~ — done via `scripts/fetch-images.mjs`; originals archived in `public/images/_archive/`, responsive WebP generated. (No hotlinking — safe when Squarespace is deleted.)
- [x] ~~Raster OG image (1200×630)~~ — `og-amanda.jpg` generated from the portrait.
- [ ] Confirmed practice opening hours → add to contact page + `MedicalClinic` `openingHours`
- [ ] Verified `sameAs` profiles (HotDoc, Google Business Profile, AHPRA) → add to Physician schema
- [ ] Google Search Console verification token + Google Analytics ID (bind to existing `data-cta` events)

## I. Analytics events already wired (bind to GA/tag manager)

`data-cta` attributes are present on every action:
`book_appointment`, `call_practice`, `get_directions`. Add the analytics
snippet and map these to conversion events. Keep health‑topic browsing out of
ad platforms (privacy).

---

## Launch plan

**Before launch**
1. Crawl old site; save old `sitemap.xml` and record current metadata/rankings (Search Console export).
2. Download all content and imagery from Squarespace.
3. Confirm redirect map (§A) and skin/cosmetic retirement map (§B).
4. Deploy to staging (noindex/password); validate schema, run Lighthouse, test booking + `tel:` + forms.
5. Supply blocking assets (§H).

**At launch**
1. Deploy production; point `dramandahenderson.com` at the new host.
2. Apply redirects; confirm single canonical host + HTTPS.
3. Remove staging noindex from production only.
4. Submit new `sitemap.xml` in Search Console; confirm ownership.
5. Manually test key URLs and every 301 (§A).

**After launch (monitor 2–8 weeks)**
- Crawl errors, 404s, redirect issues, indexed‑page count.
- Organic clicks/impressions, core query rankings, branded + local search.
- Core Web Vitals (field data).
- Confirm no unexpected skin/cosmetic 404s; add targeted 301s only if a genuinely relevant destination exists.

> Do not consider the project finished merely because the site renders correctly — verify redirects, indexing and analytics post‑launch.

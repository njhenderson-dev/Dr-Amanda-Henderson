# Deploying to Vercel (Git integration)

This is a standard Next.js 15 app — Vercel auto-detects everything, **no config
files are required**. Connect the GitHub repo once and every push deploys
automatically.

## One-time setup

1. Go to **https://vercel.com/new**.
2. **Import** the GitHub repository `njhenderson-dev/Dr-Amanda-Henderson`
   (authorise the Vercel GitHub app for the repo if prompted).
3. Vercel auto-detects the settings — leave them as-is:
   | Setting | Value (auto-detected) |
   |---|---|
   | Framework Preset | **Next.js** |
   | Build Command | `next build` |
   | Install Command | `npm install` |
   | Output Directory | *(default — Next.js)* |
   | Node.js Version | 20.x or 22.x |
4. No environment variables are needed for the current build.
5. Click **Deploy**. You'll get a `*.vercel.app` preview URL in ~1–2 minutes.

## Production branch

The finished site currently lives on branch
`claude/dramandahenderson-migration-37a676`. Vercel's **Production Branch**
defaults to `main`. Choose one:

- **Recommended:** merge the migration branch into `main` (open a PR), then
  Vercel builds `main` as production. *(I won't push to `main` without your
  say-so.)*
- **Or:** in **Vercel → Project → Settings → Git**, set the Production Branch
  to `claude/dramandahenderson-migration-37a676`.

Every branch/PR also gets its own **preview deployment** automatically.

## Custom domain (at launch — see MIGRATION-QA.md)

1. **Vercel → Project → Settings → Domains** → add `dramandahenderson.com`
   (and `www.dramandahenderson.com`).
2. Set the **apex** (`dramandahenderson.com`) as primary; Vercel will 308/301
   `www` → apex (keeps a single canonical host — matches `site.url`).
3. Update DNS at the registrar to Vercel's records (A/ALIAS for apex, CNAME for
   `www`). HTTPS is issued automatically.
4. Only point DNS **after** the pre-launch QA in `MIGRATION-QA.md` passes and
   the blocking assets (§H — real photography, images, analytics IDs, opening
   hours) are in.

## Notes

- Redirects (`next.config.mjs`) and security headers deploy with the app —
  nothing extra to configure on Vercel.
- The site is fully static/SSG, so it serves from Vercel's CDN edge with
  excellent Core Web Vitals out of the box.
- Preview deployments are automatically `noindex` by Vercel; only the
  production domain is indexable.

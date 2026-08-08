import Link from "next/link";
import { BookButton } from "./BookButton";
import { Breadcrumbs, BookingCta, FaqList } from "./ui";
import { JsonLd } from "./JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
} from "@/lib/schema";
import { getServiceArea, serviceAreas, site, practice } from "@/lib/site";
import { getArticlesByCategory, categoryLabels } from "@/lib/articles";
import type { ArticleCategory } from "@/lib/articles";

// Maps a service slug to the matching article category.
const categoryForSlug: Record<string, ArticleCategory> = {
  "womens-health": "womens-health",
  "pregnancy-care": "pregnancy",
  "childrens-health": "childrens-health",
  "general-gp-care": "general-gp-care",
};

export function ServicePage({ slug }: { slug: string }) {
  const area = getServiceArea(slug);
  if (!area) return null;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: area.title, path: area.href },
  ];

  const relatedAreas = area.related
    .map((s) => serviceAreas.find((a) => a.slug === s))
    .filter(Boolean) as typeof serviceAreas;

  const relatedArticles = getArticlesByCategory(categoryForSlug[slug]).slice(0, 5);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          {
            "@type": "MedicalWebPage",
            "@id": `${site.url}${area.href}/#page`,
            name: area.metaTitle,
            description: area.metaDescription,
            url: `${site.url}${area.href}`,
            about: { "@id": `${site.url}/#physician` },
            lastReviewed: "2026-06-24",
            audience: { "@type": "Patient" },
          },
          faqSchema(area.faqs),
        )}
      />

      {/* Header */}
      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow">{area.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {area.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{area.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <BookButton />
            <a
              href={practice.phoneHref}
              data-cta="call_practice"
              className="btn-secondary"
            >
              Call {practice.phone}
            </a>
          </div>
        </div>
      </section>

      {/* What Amanda can help with */}
      <section className="container-page py-14">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          What I can help with
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {area.covers.map((c) => (
            <div
              key={c.heading}
              className="rounded-2xl border border-line bg-white/60 p-6 shadow-soft"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {c.heading}
              </h3>
              <p className="mt-2 leading-7 text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to see + What a consult involves */}
      <section className="bg-canvas">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              When it may help to see a GP
            </h2>
            <ul className="mt-6 space-y-3">
              {area.whenToSee.map((w) => (
                <li key={w} className="flex gap-3 leading-7 text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              What a consultation may involve
            </h2>
            <p className="mt-6 max-w-prose leading-8 text-muted">
              {area.consultation}
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {area.faqs.length > 0 && (
        <section className="container-page py-14">
          <FaqList faqs={area.faqs} />
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Related reading
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-white/60 p-5 shadow-soft transition-colors hover:border-sage-200"
                >
                  <span className="font-medium text-ink">{a.title}</span>
                  <span className="flex-none text-xs text-muted">
                    {a.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related areas */}
      {relatedAreas.length > 0 && (
        <section className="container-page pb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
            Explore also
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedAreas.map((r) => (
              <Link
                key={r.slug}
                href={r.href}
                className="rounded-full border border-line bg-white/60 px-5 py-2 text-sm font-medium text-ink hover:border-sage-200"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <BookingCta />
    </>
  );
}

// Metadata helper shared by each service route.
export function serviceMetadata(slug: string) {
  const area = getServiceArea(slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: area.href },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${site.url}${area.href}`,
      type: "website" as const,
    },
  };
}

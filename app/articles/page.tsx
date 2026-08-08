import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, IDS } from "@/lib/schema";
import { site } from "@/lib/site";
import {
  getAllArticles,
  categoryLabels,
  type ArticleCategory,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: "Health Articles | Dr Amanda Henderson, GP Maroubra",
  description:
    "Clear, practical health information written by Dr Amanda Henderson — on women's health, pregnancy, children's health and general practice.",
  alternates: { canonical: "/articles" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Articles", path: "/articles" },
];

const categoryOrder: ArticleCategory[] = [
  "womens-health",
  "pregnancy",
  "childrens-health",
  "general-gp-care",
];

export default function ArticlesPage() {
  const all = getAllArticles();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), {
          "@type": "Blog",
          "@id": `${site.url}/articles/#blog`,
          name: "Health Articles by Dr Amanda Henderson",
          url: `${site.url}/articles`,
          author: { "@id": IDS.physician },
          publisher: { "@id": IDS.physician },
          blogPost: all.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            url: `${site.url}/articles/${a.slug}`,
            datePublished: a.datePublished,
            author: { "@id": IDS.physician },
          })),
        })}
      />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow">Health information</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Reading room
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            A small, considered library of health information &mdash; written to
            help you prepare for a visit, understand your options, and know when
            it&rsquo;s worth seeing a GP. Everything here is general information,
            not personal medical advice.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {categoryOrder.map((cat) => {
          const items = all.filter((a) => a.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat} className="mb-14">
              <h2 className="font-serif text-2xl font-semibold text-ink">
                {categoryLabels[cat]}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-white/60 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-sage-200"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-sage-600">
                        {a.readingMinutes} min read
                      </p>
                      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink group-hover:underline">
                        {a.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                        {a.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <BookingCta />
    </>
  );
}

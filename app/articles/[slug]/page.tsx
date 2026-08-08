import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdGraph,
} from "@/lib/schema";
import { site } from "@/lib/site";
import {
  getArticle,
  getArticleSlugs,
  getArticlesByCategory,
  categoryLabels,
} from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${site.url}/articles/${slug}`,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["Dr Amanda Henderson"],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: article.title, path: `/articles/${slug}` },
  ];

  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const published = new Date(article.datePublished);
  const modified = new Date(article.dateModified);
  const wasUpdated = article.dateModified > article.datePublished;

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          articleSchema({
            title: article.title,
            description: article.description,
            slug,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
          }),
        )}
      />

      <article className="container-prose pt-10">
        <Breadcrumbs items={crumbs} />

        <header className="mt-6">
          <p className="eyebrow">
            <Link href="/articles" className="hover:underline">
              {categoryLabels[article.category]}
            </Link>
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>
              Written by{" "}
              <Link href="/about" className="font-medium text-sage-700 hover:underline">
                Dr Amanda Henderson
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
          <div className="mt-1 text-sm text-muted">
            <time dateTime={article.datePublished}>
              Published {dateFmt.format(published)}
            </time>
            {wasUpdated && (
              <>
                {" · "}
                <time dateTime={article.dateModified}>
                  Reviewed {dateFmt.format(modified)}
                </time>
              </>
            )}
          </div>
        </header>

        <div
          className="prose-doc mt-10"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <div className="mt-12 rounded-2xl border border-line bg-canvas p-6 text-sm leading-6 text-muted">
          <p className="font-medium text-ink">A note on this information</p>
          <p className="mt-2">
            This article is general information written by Dr Amanda Henderson
            and is not a substitute for personal medical advice. For advice about
            your own situation, please book an appointment. In an emergency, call{" "}
            <a href="tel:000" className="font-medium text-ink">
              000
            </a>
            .
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-prose mt-14">
          <h2 className="font-serif text-xl font-semibold">More on {categoryLabels[article.category]}</h2>
          <ul className="mt-5 space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/articles/${r.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-white/60 p-4 shadow-soft transition-colors hover:border-sage-200"
                >
                  <span className="font-medium text-ink">{r.title}</span>
                  <span className="flex-none text-xs text-muted">
                    {r.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-16">
        <BookingCta />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
  IDS,
} from "@/lib/schema";
import { site } from "@/lib/site";

const description =
  "How medical information on Dr Amanda Henderson's website is written, sourced, reviewed and corrected. All content is general information only.";

export const metadata: Metadata = {
  title: { absolute: "Editorial Policy | Dr Amanda Henderson" },
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    type: "article",
    title: "Editorial Policy | Dr Amanda Henderson",
    description,
    url: `${site.url}/editorial-policy`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Editorial policy", path: "/editorial-policy" },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "WebPage",
            path: "/editorial-policy",
            name: "Editorial Policy",
            description,
            aboutId: IDS.person,
            hasBreadcrumb: true,
          }),
        )}
      />

      <article className="container-prose pt-10">
        <Breadcrumbs items={crumbs} />
        <header className="mt-6">
          <p className="eyebrow">About this site</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Editorial policy
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            How the health information on this website is written, sourced,
            reviewed and kept up to date.
          </p>
        </header>

        <div className="prose-doc mt-10">
          <h2>Who writes the content</h2>
          <p>
            The medical articles and clinical information on this website are
            written by{" "}
            <Link href="/about">Dr Amanda Henderson</Link>, a family GP (FRACGP)
            practising in Maroubra. Where an article names Dr Henderson as the
            author, she has written or edited it herself.
          </p>

          <h2>How sources are chosen</h2>
          <p>
            Information is based on reputable Australian sources - such as
            Healthdirect, NSW Health, the Australian Government Department of
            Health, the RACGP, RANZCOG, the Royal Hospital for Women and the
            Australian Immunisation Handbook - and on Dr Henderson&rsquo;s
            clinical training and experience. Where a page makes a substantive
            factual point, we aim to point to a trusted source under
            &ldquo;Sources and further reading&rdquo;. We do not cite sources we
            have not read, and we do not invent references.
          </p>

          <h2>General information, not personal advice</h2>
          <p>
            Everything on this website is general information. It is not a
            substitute for a consultation with a doctor who knows your history,
            and it should not be used to diagnose or treat a health problem.
            Health advice can change, and your own circumstances may be
            different. If you have a specific concern, please{" "}
            <Link href="/contact">book an appointment</Link>. In an emergency,
            call <a href="tel:000">000</a>.
          </p>

          <h2>How content is reviewed and updated</h2>
          <p>
            Articles show a publication date, and a &ldquo;reviewed&rdquo; date
            when they have been checked or updated. We review content
            periodically and when relevant guidance changes. Where an article
            has not been separately reviewed by another clinician, we do not
            claim that it has been &ldquo;medically reviewed&rdquo; by someone
            else - the author attribution reflects who is responsible for it.
          </p>

          <h2>Corrections</h2>
          <p>
            If you notice something that looks out of date or incorrect, we
            would genuinely like to know. Please get in touch via the{" "}
            <Link href="/contact">contact page</Link> and we&rsquo;ll review it
            and update the content where needed.
          </p>

          <p>
            For how your information is handled on this website, see our{" "}
            <Link href="/privacy">privacy page</Link>.
          </p>
        </div>
      </article>
    </>
  );
}

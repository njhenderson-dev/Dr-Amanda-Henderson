import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { fees, practice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fees | Dr Amanda Henderson, GP Maroubra",
  description:
    "Appointment fees for Dr Amanda Henderson, a private billing GP in Maroubra.",
  alternates: { canonical: "/fees" },
  // Intentionally kept out of search engines and AI answer engines — patients
  // reach this page from the site's navigation, not from search. (Paired with
  // an X-Robots-Tag header in next.config.mjs, AI-crawler rules in robots.ts,
  // and exclusion from sitemap.xml.)
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Fees", path: "/fees" },
];

// $110 → "$110"; $43.90 → "$43.90". Whole dollars drop the cents.
function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

export default function FeesPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), {
          "@type": "MedicalWebPage",
          "@id": `${site.url}/fees/#page`,
          name: "Fees",
          description:
            "Consultation fees and Medicare rebates for Dr Amanda Henderson, a private billing GP in Maroubra.",
          url: `${site.url}/fees`,
          about: { "@id": `${site.url}/#physician` },
          audience: { "@type": "Patient" },
        })}
      />

      {/* Intro */}
      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow">Appointments</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Fees
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            This is a private billing practice, so appointments are not bulk
            billed. Below is exactly what a consultation costs and what you can
            claim back from Medicare &mdash; so you know where you stand before
            you book.
          </p>
        </div>
      </section>

      {/* Fee cards */}
      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {fees.items.map((item) => {
            const outOfPocket = Math.round((item.fee - item.rebate) * 100) / 100;
            return (
              <div
                key={item.length}
                className="flex flex-col rounded-2xl border border-line bg-white/60 p-7 shadow-soft"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
                  {item.length}
                </p>

                <div className="mt-4">
                  <p className="text-sm text-muted">Consultation fee</p>
                  <p className="font-serif text-4xl font-semibold text-ink">
                    {money(item.fee)}
                  </p>
                </div>

                <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted">Medicare rebate</dt>
                    <dd className="font-medium text-ink">
                      &minus;{money(item.rebate)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 rounded-xl bg-sage-50 px-4 py-3">
                    <dt className="font-medium text-sage-700">
                      Estimated out-of-pocket
                    </dt>
                    <dd className="font-serif text-2xl font-semibold text-sage-700">
                      {money(outOfPocket)}
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>

        {/* Medicare note */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-line bg-canvas p-6">
          <p className="leading-7 text-muted">
            If you have a valid Medicare card, you may be eligible for the
            Medicare rebate shown. The estimated out-of-pocket amount is simply
            the consultation fee less that rebate. The length of your
            appointment depends on what you&rsquo;d like to cover &mdash; if
            you&rsquo;re not sure which to book, it&rsquo;s always fine to ask.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookButton />
          <a
            href={practice.phoneHref}
            data-cta="call_practice"
            className="btn-secondary"
          >
            Call {practice.phone}
          </a>
        </div>
      </section>

      <BookingCta
        heading="Book with confidence about the cost"
        body="Appointments can be made online through HotDoc, or by calling the practice. If you have any questions about fees, we're happy to help."
      />
    </>
  );
}

import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";
import { AppointmentPromo } from "@/components/AppointmentPromo";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { practice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fees & billing | Dr Amanda Henderson, GP Maroubra",
  description:
    "Dr Amanda Henderson is a private billing GP in Maroubra. Patients with a valid Medicare card are eligible for a Medicare rebate on their consultation.",
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

export default function FeesPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(crumbs), {
          "@type": "MedicalWebPage",
          "@id": `${site.url}/fees/#page`,
          name: "Fees & billing",
          description:
            "Billing information for Dr Amanda Henderson, a private billing GP in Maroubra.",
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
            Fees &amp; billing
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            This is a private billing practice, so appointments are privately
            billed rather than bulk billed. If you have a valid Medicare card,
            you&rsquo;ll be eligible for a Medicare rebate on your consultation,
            which reduces your out-of-pocket cost.
          </p>
        </div>
      </section>

      {/* Billing note */}
      <section className="container-page py-10">
        <div className="max-w-3xl rounded-2xl border border-line bg-white/60 p-7 shadow-soft">
          <h2 className="font-serif text-xl font-semibold text-ink">
            What it costs
          </h2>
          <p className="mt-3 leading-7 text-muted">
            The fee depends on the length and type of your appointment. If
            you&rsquo;d like to know the cost before you book, you&rsquo;re very
            welcome to call the practice on{" "}
            <a
              href={practice.phoneHref}
              data-cta="call_practice"
              className="font-medium text-sage-700 hover:underline"
            >
              {practice.phone}
            </a>{" "}
            &mdash; we&rsquo;re always happy to talk it through.
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

        <div className="mt-8 max-w-3xl">
          <AppointmentPromo />
        </div>
      </section>

      <BookingCta
        heading="Any questions about billing?"
        body="You're welcome to call the practice before you book — we're happy to help. Appointments can be made online through HotDoc, or by phone."
      />
    </>
  );
}

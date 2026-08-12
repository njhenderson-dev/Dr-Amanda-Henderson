import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
  IDS,
} from "@/lib/schema";
import { practice, fullAddress, site } from "@/lib/site";

const description = `Contact Dr Amanda Henderson at ${practice.name}, ${fullAddress}. Book online via HotDoc or call ${practice.phone}.`;

export const metadata: Metadata = {
  title: { absolute: "Contact & Location | Dr Amanda Henderson, GP Maroubra" },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact & Location | Dr Amanda Henderson, GP Maroubra",
    description,
    url: `${site.url}/contact`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "ContactPage",
            path: "/contact",
            name: "Contact & Location — Dr Amanda Henderson",
            description,
            aboutId: IDS.clinic,
            mainEntityId: IDS.clinic,
            hasBreadcrumb: true,
          }),
        )}
      />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact &amp; location
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Booking is easiest online through HotDoc. You&rsquo;re also very
            welcome to call the practice.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Location */}
          <div className="rounded-2xl border border-line bg-white/60 p-8 shadow-soft">
            <h2 className="font-serif text-xl font-semibold">Practice location</h2>
            <address className="mt-4 not-italic text-lg leading-8 text-muted">
              <span className="font-medium text-ink">{practice.name}</span>
              <br />
              {practice.streetAddress}
              <br />
              {practice.suburb} {practice.region} {practice.postcode}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={practice.mapsUrl}
                target="_blank"
                rel="noopener"
                data-cta="get_directions"
                className="btn-secondary"
              >
                Get directions
              </a>
            </div>
          </div>

          {/* Booking & phone */}
          <div className="rounded-2xl border border-line bg-white/60 p-8 shadow-soft">
            <h2 className="font-serif text-xl font-semibold">Appointments</h2>
            <p className="mt-4 leading-7 text-muted">
              Book online any time, or call during practice hours. This is a
              private billing practice &mdash; see{" "}
              <Link href="/fees" className="font-medium text-sage-700 hover:underline">
                fees
              </Link>{" "}
              for consultation costs and Medicare rebates.
            </p>
            <p className="mt-4 text-lg">
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
            </p>
            <div className="mt-6">
              <BookButton />
            </div>
          </div>
        </div>

        {/* Urgent / after-hours */}
        <div className="mt-6 rounded-2xl border border-blush-100 bg-blush-100/40 p-8">
          <h2 className="font-serif text-xl font-semibold">
            Urgent &amp; after-hours care
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-medium text-ink">In an emergency</p>
              <p className="mt-1 leading-7 text-muted">
                Always call{" "}
                <a href="tel:000" className="font-semibold text-ink">
                  000
                </a>{" "}
                or go to your nearest emergency department.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">After hours (non-emergency)</p>
              <p className="mt-1 leading-7 text-muted">
                {practice.afterHours.label}:{" "}
                <a
                  href={practice.afterHours.phoneHref}
                  className="font-medium text-sage-700 hover:underline"
                >
                  {practice.afterHours.phone}
                </a>{" "}
                or{" "}
                <a
                  href={practice.afterHours.altPhoneHref}
                  className="font-medium text-sage-700 hover:underline"
                >
                  {practice.afterHours.altPhone}
                </a>
                .
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">
            Health advice is also available from healthdirect on{" "}
            <a href="tel:1800022222" className="font-medium text-sage-700 hover:underline">
              1800 022 222
            </a>{" "}
            (24 hours).
          </p>
        </div>
      </section>
    </>
  );
}

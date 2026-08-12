import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { AppointmentSelector } from "@/components/AppointmentSelector";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
  IDS,
} from "@/lib/schema";
import { site } from "@/lib/site";

const description =
  "A quick, private tool to help you choose the right appointment length with Dr Amanda Henderson. No personal or medical information required.";

export const metadata: Metadata = {
  title: { absolute: "Which appointment should I book? | Dr Amanda Henderson" },
  description,
  alternates: { canonical: "/which-appointment" },
  openGraph: {
    type: "website",
    title: "Which appointment should I book? | Dr Amanda Henderson",
    description,
    url: `${site.url}/which-appointment`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Which appointment should I book?", path: "/which-appointment" },
];

export default function WhichAppointmentPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "WebPage",
            path: "/which-appointment",
            name: "Which appointment should I book?",
            description,
            aboutId: IDS.physician,
            hasBreadcrumb: true,
          }),
        )}
      />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-2xl">
          <p className="eyebrow">Booking helper</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Which appointment should I book?
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Answer one quick question and we&rsquo;ll suggest the right
            appointment length - it takes about fifteen seconds.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="max-w-3xl">
          <AppointmentSelector />
        </div>
      </section>
    </>
  );
}

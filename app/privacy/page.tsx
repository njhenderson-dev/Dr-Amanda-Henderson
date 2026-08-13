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
import { site, practice } from "@/lib/site";

const description =
  "How your privacy is respected at GP Maroubra and on this website, including analytics, online bookings, and how to access or correct your information.";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Dr Amanda Henderson, GP Maroubra" },
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    title: "Privacy | Dr Amanda Henderson, GP Maroubra",
    description,
    url: `${site.url}/privacy`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "WebPage",
            path: "/privacy",
            name: "Privacy",
            description,
            aboutId: IDS.clinic,
            hasBreadcrumb: true,
          }),
        )}
      />

      <article className="container-prose pt-10">
        <Breadcrumbs items={crumbs} />
        <header className="mt-6">
          <p className="eyebrow">About this site</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            How your privacy is respected when you see Dr Amanda Henderson and
            when you use this website.
          </p>
        </header>

        <div className="prose-doc mt-10">
          <h2>Your health information</h2>
          <p>
            As a medical practice, Dr Amanda Henderson and {practice.name}{" "}
            handle personal and health information, and are bound by the{" "}
            <a
              href="https://www.oaic.gov.au/privacy/privacy-legislation/the-privacy-act"
              target="_blank"
              rel="noopener nofollow"
            >
              Privacy Act 1988 (Cth)
            </a>{" "}
            and the Australian Privacy Principles. The information you share
            during your care is kept confidential and handled in line with those
            obligations and with medical record-keeping requirements.
          </p>

          <h2>What this website collects</h2>
          <p>
            This website is mainly for information and booking. It does{" "}
            <strong>not</strong> collect health information through forms - there
            are no symptom questionnaires or medical forms on the site, and the{" "}
            <Link href="/which-appointment">appointment helper</Link> keeps your
            selections in your browser and does not send them to the practice.
          </p>
          <p>Two things do involve third parties:</p>
          <ul>
            <li>
              <strong>Analytics.</strong> We use Google Analytics 4 to understand
              how the site is used - for example which pages are visited, and
              general device and location information. This uses cookies. We have
              turned off Google&rsquo;s advertising features, so your browsing on
              this site is not used for ad targeting.
            </li>
            <li>
              <strong>Online bookings.</strong> Appointments are booked through{" "}
              <a
                href="https://www.hotdoc.com.au/privacy-policy"
                target="_blank"
                rel="noopener nofollow"
              >
                HotDoc
              </a>
              , a third-party booking provider. When you book, the information
              you enter is handled under HotDoc&rsquo;s own privacy policy.
            </li>
          </ul>

          <h2>Cookies</h2>
          <p>
            The site uses analytics cookies (through Google Analytics) to measure
            general usage. You can block or delete cookies at any time in your
            browser settings; the site will still work.
          </p>

          <h2>Accessing or correcting your information</h2>
          <p>
            You can ask to access or correct the personal information the
            practice holds about you. Please get in touch via the{" "}
            <Link href="/contact">contact page</Link> and we&rsquo;ll help.
          </p>

          <h2>Concerns or complaints</h2>
          <p>
            If you have a privacy concern, please raise it with the practice
            first through the <Link href="/contact">contact page</Link>. If you
            are not satisfied with how it is handled, you can contact the{" "}
            <a
              href="https://www.oaic.gov.au/privacy/privacy-complaints"
              target="_blank"
              rel="noopener nofollow"
            >
              Office of the Australian Information Commissioner (OAIC)
            </a>
            .
          </p>

          <p className="text-sm text-muted">
            This page is general information about privacy on this website and is
            not legal advice. It may be updated from time to time.
          </p>
        </div>
      </article>
    </>
  );
}

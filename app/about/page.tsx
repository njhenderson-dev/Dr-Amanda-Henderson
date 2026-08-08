import type { Metadata } from "next";
import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { BookButton } from "@/components/BookButton";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import {
  site,
  practice,
  qualifications,
  serviceAreas,
  expectations,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Dr Amanda Henderson | Family GP, Maroubra",
  description:
    "Dr Amanda Henderson (MBBS, FRACGP) is a female family GP in Maroubra, Sydney and a shared antenatal care provider with the Royal Hospital for Women. Learn about her approach and qualifications.",
  alternates: { canonical: "/about" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(crumbs))} />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">About Dr Amanda Henderson</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Medicine that starts with listening
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              <p>
                I&rsquo;m Dr Amanda Henderson, a female family GP based in
                Maroubra in Sydney&rsquo;s eastern suburbs. I chose general
                practice because I love the breadth of it &mdash; and because it
                lets me get to know people and their families over time, rather
                than for a single problem.
              </p>
              <p>
                My approach is thorough and unhurried. I&rsquo;d rather
                understand the whole picture than treat a symptom in isolation,
                and I try to explain things clearly so you can make decisions
                that are right for you. I&rsquo;m a mother myself, and I take
                parents&rsquo; concerns seriously.
              </p>
            </div>
            <div className="mt-7">
              <BookButton />
            </div>
          </div>
          <Portrait
            className="mx-auto aspect-[4/5] w-full max-w-sm shadow-soft"
            label="Photograph of Dr Amanda Henderson — to be supplied"
          />
        </div>
      </section>

      {/* Approach */}
      <section className="bg-canvas">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              How I like to work
            </h2>
          </div>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((e) => (
              <div key={e.title}>
                <dt className="font-serif text-xl font-semibold text-ink">
                  {e.title}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{e.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Areas of interest */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Areas of clinical interest
            </h2>
            <p className="mt-4 leading-8 text-muted">
              I care for people across the whole range of general practice, with
              particular experience and interest in:
            </p>
            <ul className="mt-6 space-y-3">
              {serviceAreas.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white/60 px-5 py-4 shadow-soft transition-colors hover:border-sage-200"
                  >
                    <span className="font-medium text-ink">{s.title}</span>
                    <span aria-hidden="true" className="text-sage-600">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Qualifications &amp; registration
            </h2>
            <ul className="mt-6 space-y-4 text-muted">
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Bachelor of Medicine, Bachelor of Surgery (MBBS)
                </span>
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Fellow of the Royal Australian College of General
                  Practitioners (FRACGP)
                </span>
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Registered shared antenatal care provider
                </span>
                <br />
                Royal Hospital for Women, Randwick
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Registered medical practitioner
                </span>
                <br />
                Australian Health Practitioner Regulation Agency (AHPRA)
              </li>
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted">
              Prior qualifications include {qualifications.filter((q) => ["MAppIFin", "BComm", "BBus"].includes(q)).join(", ")} &mdash;
              a background that informs a considered, practical approach to care.
            </p>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="bg-canvas">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Where I practise
            </h2>
            <p className="mt-4 leading-8 text-muted">
              I consult at {practice.name}, {practice.streetAddress},{" "}
              {practice.suburb}. Appointments can be made online, or by calling{" "}
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
              . Full location and contact details are on the{" "}
              <Link href="/contact" className="font-medium text-sage-700 hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <BookingCta />
    </>
  );
}

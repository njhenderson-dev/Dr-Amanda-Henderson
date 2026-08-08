import Link from "next/link";
import { BookButton } from "./BookButton";
import { practice } from "@/lib/site";

// Full-width booking band placed at the end of content pages.
export function BookingCta({
  heading = "Ready to book?",
  body = "Appointments can be made online through HotDoc, or call the practice — I'd be glad to help.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-sage-600">
      <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-sage-50">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookButton className="!bg-white !text-sage-700 hover:!bg-sage-50">
            Book an appointment
          </BookButton>
          <a
            href={practice.phoneHref}
            data-cta="call_practice"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 font-medium text-white hover:bg-white/10"
          >
            Call {practice.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-ink">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FaqList({
  faqs,
  heading = "Common questions",
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-serif text-2xl font-semibold sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
              {f.q}
              <span className="text-sage-600 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose leading-7 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Small labelled section wrapper used across pages.
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>
      )}
    </div>
  );
}

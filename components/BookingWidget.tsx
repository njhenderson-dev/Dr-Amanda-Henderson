import { BookButton } from "./BookButton";
import { practice, hotdocEmbed } from "@/lib/site";

// Compact homepage "book online / check availability" unit.
//
// When `hotdocEmbed` (lib/site.ts) is set to HotDoc's iframe embed, the live
// availability widget renders below the intro. Until then it shows an accurate
// booking CTA that links to HotDoc - never a fabricated "next available" time.
export function BookingWidget() {
  return (
    <section className="container-page py-12">
      <div className="rounded-2xl border border-line bg-canvas p-7 shadow-soft sm:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Book online</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
              Check availability &amp; book
            </h2>
            <p className="mt-3 leading-7 text-muted">
              See Dr Amanda Henderson&rsquo;s current appointment times and book
              online through HotDoc, or call the practice.
            </p>
          </div>
          <div className="flex flex-none flex-col gap-3 sm:flex-row">
            <BookButton />
            <a
              href={practice.phoneHref}
              data-cta="call_practice"
              className="btn-secondary"
            >
              Call {practice.phone}
            </a>
          </div>
        </div>

        {hotdocEmbed ? (
          <div
            className="mt-7 overflow-hidden rounded-xl border border-line bg-white"
            // Trusted, build-time embed from the practice's own HotDoc account.
            dangerouslySetInnerHTML={{ __html: hotdocEmbed }}
          />
        ) : null}
      </div>
    </section>
  );
}

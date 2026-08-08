import Link from "next/link";

const TOOL_PATH = "/which-appointment";

// Full module — used beneath the homepage hero.
export function AppointmentModule() {
  return (
    <section className="container-page py-8">
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-canvas p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-xl">
          <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
            Not sure which appointment to book?
          </h2>
          <p className="mt-2 leading-7 text-muted">
            We&rsquo;ll help you choose the right appointment length in a few
            seconds. No personal or medical information required.
          </p>
        </div>
        <Link href={TOOL_PATH} className="btn-primary flex-none">
          Find my appointment
        </Link>
      </div>
    </section>
  );
}

// Compact promo — used on service/pillar and fees pages.
export function AppointmentPromo() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-canvas p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-ink">Not sure which appointment to book?</p>
        <p className="mt-0.5 text-sm text-muted">
          Find the right appointment length in a few seconds.
        </p>
      </div>
      <Link href={TOOL_PATH} className="btn-ghost flex-none">
        Find my appointment →
      </Link>
    </div>
  );
}

// Slim inline link — used on article pages so they aren't overwhelmed.
export function AppointmentPromoInline() {
  return (
    <p className="text-sm text-muted">
      Not sure which appointment to book?{" "}
      <Link href={TOOL_PATH} className="font-medium text-sage-700 hover:underline">
        Find the right appointment length →
      </Link>
    </p>
  );
}

import Link from "next/link";

const TOOL_PATH = "/which-appointment";

// Compact single-line pill — used beneath the homepage hero. Prominent but
// small, so it doesn't interrupt the homepage flow.
export function AppointmentModule() {
  return (
    <section className="container-page py-6">
      <div className="flex justify-center">
        <Link
          href={TOOL_PATH}
          className="group inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-canvas px-5 py-2.5 text-center text-sm shadow-soft transition-colors hover:border-sage-400"
        >
          <span className="text-muted">Not sure which appointment to book?</span>
          <span className="font-medium text-sage-700 group-hover:underline">
            Find my appointment →
          </span>
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

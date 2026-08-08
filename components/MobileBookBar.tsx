import { practice } from "@/lib/site";

// Restrained sticky booking bar for mobile only. Sits above the fold's reach
// so the primary action is always one tap away, without covering content on
// desktop.
export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href={practice.phoneHref}
          data-cta="call_practice"
          className="btn-secondary flex-1 px-4 py-3 text-[0.95rem]"
          aria-label={`Call the practice on ${practice.phone}`}
        >
          Call
        </a>
        <a
          href={practice.bookingUrl}
          target="_blank"
          rel="noopener"
          data-cta="book_appointment"
          className="btn-primary flex-[2] px-4 py-3 text-[0.95rem]"
        >
          Book an appointment
        </a>
      </div>
    </div>
  );
}

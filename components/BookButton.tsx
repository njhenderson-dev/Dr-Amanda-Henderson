import { practice } from "@/lib/site";

type Props = {
  variant?: "primary" | "secondary";
  className?: string;
  children?: React.ReactNode;
  // Analytics hook - a data attribute meaningful actions can be bound to.
  event?: string;
};

// Single source of truth for the booking CTA. Always points at the
// established HotDoc booking destination.
export function BookButton({
  variant = "primary",
  className = "",
  children = "Book an appointment",
  event = "book_appointment",
}: Props) {
  return (
    <a
      href={practice.bookingUrl}
      target="_blank"
      rel="noopener"
      data-cta={event}
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      {children}
    </a>
  );
}

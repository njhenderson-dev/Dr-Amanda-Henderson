import { practice } from "@/lib/site";

// ---------------------------------------------------------------------------
// Single source of truth for the "Which appointment should I book?" tool.
//
// Appointment lengths reflect the practice's standard and longer consultations
// (a ~15-minute standard and an up-to-30-minute longer appointment). HotDoc's
// booking page is JavaScript-rendered and could not be machine-read, so the
// exact HotDoc reason-for-visit labels should be confirmed and the
// `bookingName` values updated to match precisely. Booking deep-links to a
// specific appointment type are not reliably supported by HotDoc, so the tool
// links to the doctor's booking page and shows the exact appointment name to
// select.
//
// Dedicated appointment types (e.g. a distinct procedure booking) can be added
// to `dedicatedAppointmentTypes` — the tool then shows an optional second
// question. It ships empty because none were verifiable, and skin-check /
// cosmetic appointments are intentionally excluded from this practice.
// ---------------------------------------------------------------------------

export const BOOKING_URL = practice.bookingUrl;

export type AppointmentTypeId = "standard" | "long";

export type AppointmentType = {
  id: string;
  /** Patient-facing name shown in the result. */
  displayName: string;
  /** The exact name to select in HotDoc when booking. */
  bookingName: string;
  /** Human duration string. */
  duration: string;
  /** Whether this is a dedicated (non-generic) appointment type. */
  dedicated: boolean;
  bookingUrl: string;
};

export const appointmentTypes: Record<AppointmentTypeId, AppointmentType> = {
  standard: {
    id: "standard",
    displayName: "Standard appointment",
    bookingName: "Standard consultation",
    duration: "About 15 minutes",
    dedicated: false,
    bookingUrl: BOOKING_URL,
  },
  long: {
    id: "long",
    displayName: "Long appointment",
    bookingName: "Long consultation",
    duration: "Up to 30 minutes",
    dedicated: false,
    bookingUrl: BOOKING_URL,
  },
};

// The single question's options.
export type AnswerId =
  | "first"
  | "one"
  | "one_more_time"
  | "several"
  | "follow_up"
  | "not_sure";

export const answerOptions: { id: AnswerId; title: string; subtitle: string }[] =
  [
    {
      id: "first",
      title: "First appointment with Dr Amanda Henderson",
      subtitle: "It's my first time seeing Amanda.",
    },
    {
      id: "one",
      title: "One straightforward thing",
      subtitle: "I have one main issue or question to discuss.",
    },
    {
      id: "one_more_time",
      title: "One thing I'd like more time to discuss",
      subtitle: "One main issue, but I'd prefer more time to talk it through.",
    },
    {
      id: "several",
      title: "Several things",
      subtitle: "I have more than one issue I'd like to discuss.",
    },
    {
      id: "follow_up",
      title: "Follow-up",
      subtitle: "I'm following up something Amanda and I have already discussed.",
    },
    {
      id: "not_sure",
      title: "Not sure",
      subtitle: "I'd rather book enough time.",
    },
  ];

export type Recommendation = {
  type: AppointmentType;
  explanation: string;
  /** Optional extra instruction shown near the booking button. */
  selectNote?: string;
};

// Deterministic mapping — no LLM, no health data.
export function recommend(answer: AnswerId): Recommendation {
  const { standard, long } = appointmentTypes;
  switch (answer) {
    case "first":
      return {
        type: long,
        explanation:
          "A longer appointment gives you and Amanda more time to go through your history and what you'd like help with.",
        selectNote:
          "If a “new patient” appointment is offered when you book, choose that.",
      };
    case "one":
      return {
        type: standard,
        explanation:
          "For one straightforward issue, a standard appointment is usually the best fit.",
      };
    case "one_more_time":
      return {
        type: long,
        explanation:
          "This gives you enough time to talk one thing through properly without feeling rushed.",
      };
    case "several":
      return {
        type: long,
        explanation:
          "This should give you enough time to discuss more than one thing without feeling rushed.",
      };
    case "follow_up":
      return {
        type: standard,
        explanation:
          "For following up something you've already discussed, a standard appointment is usually enough.",
      };
    case "not_sure":
      return {
        type: long,
        explanation:
          "Booking a little more time means you won't feel rushed if there's more to cover.",
      };
  }
}

// Dedicated appointment types trigger an optional second question. Empty by
// design: none were verifiable in the booking system, and skin-check/cosmetic
// appointments are intentionally not offered by this practice.
export const dedicatedAppointmentTypes: AppointmentType[] = [];

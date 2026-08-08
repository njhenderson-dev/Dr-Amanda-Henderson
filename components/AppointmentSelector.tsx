"use client";

import { useState } from "react";
import Link from "next/link";
import {
  answerOptions,
  recommend,
  dedicatedAppointmentTypes,
  type AnswerId,
  type Recommendation,
} from "@/data/appointmentTypes";

// Fire-and-forget analytics. Sends ONLY the event name — never the user's
// selection, medical context or any identifying data. No-ops if no analytics
// is installed.
function track(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    dataLayer?: unknown[];
  };
  try {
    if (typeof w.gtag === "function") w.gtag("event", event);
    else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event });
  } catch {
    /* never let analytics break the tool */
  }
}

export function AppointmentSelector() {
  const [result, setResult] = useState<Recommendation | null>(null);
  const [started, setStarted] = useState(false);

  function choose(answer: AnswerId) {
    if (!started) {
      track("appointment_selector_started");
      setStarted(true);
    }
    // (Dedicated appointment types would insert an optional second question
    // here; none are configured, so we go straight to the recommendation.)
    void dedicatedAppointmentTypes;
    const rec = recommend(answer);
    track("appointment_selector_completed");
    track(
      rec.type.id === "standard"
        ? "recommendation_standard"
        : "recommendation_long",
    );
    setResult(rec);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setResult(null);
  }

  if (result) {
    return (
      <div className="animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sage-600">
          We suggest
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {result.type.displayName}
        </h2>
        <p className="mt-2 text-xl text-muted">{result.type.duration}</p>

        <p className="mt-6 max-w-xl text-lg leading-8 text-ink">
          {result.explanation}
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-canvas p-5 text-sm text-muted">
          When booking, choose{" "}
          <span className="font-semibold text-ink">
            “{result.type.bookingName}”
          </span>
          .{result.selectNote ? ` ${result.selectNote}` : ""}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={result.type.bookingUrl}
            target="_blank"
            rel="noopener"
            data-cta="book_appointment"
            onClick={() => track("booking_clicked")}
            className="btn-primary px-8 py-4 text-lg"
          >
            Book this appointment
          </a>
          <button
            type="button"
            onClick={reset}
            className="text-base font-medium text-sage-700 underline-offset-4 hover:underline"
          >
            Choose a different appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        How much would you like to cover?
      </h2>
      <p className="mt-3 text-muted">
        No personal or medical information required. Nothing you select here is
        sent to the practice.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {answerOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => choose(opt.id)}
            className="group flex flex-col rounded-2xl border border-line bg-white/70 p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-sage-400 focus-visible:border-sage-400"
          >
            <span className="font-serif text-lg font-semibold text-ink">
              {opt.title}
            </span>
            <span className="mt-1.5 text-sm leading-6 text-muted">
              {opt.subtitle}
            </span>
            <span
              aria-hidden="true"
              className="mt-4 text-sm font-medium text-sage-700 opacity-0 transition-opacity group-hover:opacity-100"
            >
              Choose →
            </span>
          </button>
        ))}
      </div>

      <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
        This tool helps you choose an appointment type only. It doesn&rsquo;t
        assess whether medical care is urgent. If you&rsquo;re not sure how
        quickly you need to be seen, read{" "}
        <Link
          href="/articles/gp-urgent-care-or-000-how-to-decide-in-sydneys-eastern-suburbs"
          className="font-medium text-sage-700 hover:underline"
        >
          GP, urgent care or 000?
        </Link>
        . In an emergency, call{" "}
        <a href="tel:000" className="font-medium text-ink">
          000
        </a>
        .
      </p>
    </div>
  );
}

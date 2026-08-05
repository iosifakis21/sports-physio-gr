"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AthleteCard, Athlete } from "@/components/AthleteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import athletesData from "@/content/athletes.json";

// Tolerance for the start/end checks: scrollLeft, clientWidth and scrollWidth
// are fractional on zoomed or fractional-DPI displays, so an exact comparison
// would leave the right arrow enabled forever at the end of the row.
const EDGE_EPSILON = 2;
// Matches the `gap-6` between cards; used to work out one card's scroll step.
const CARD_GAP = 24;

const ChevronIcon: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "left" ? "M15.75 19.5 8.25 12l7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
    />
  </svg>
);

const ArrowButton: React.FC<{
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}> = ({ direction, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Προηγούμενοι αθλητές" : "Επόμενοι αθλητές"}
    className={`pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full border shadow-lg transition-all duration-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary ${
      disabled
        ? "bg-slate-900/60 border-white/10 text-white/25 cursor-not-allowed"
        : "bg-slate-900/90 border-white/20 text-white cursor-pointer hover:bg-primary hover:border-primary hover:scale-105 active:scale-95"
    }`}
  >
    <ChevronIcon direction={direction} />
  </button>
);

const AthleteScroller: React.FC<{ athletes: Athlete[] }> = ({ athletes }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Which athlete's clip is playing, if any. Lifted here so starting one card
  // stops whichever card was playing before.
  const [playingId, setPlayingId] = useState<string | null>(null);

  const syncEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > EDGE_EPSILON);
    setCanScrollRight(el.scrollLeft < maxScroll - EDGE_EPSILON);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncEdges();
    // ResizeObserver covers both viewport changes and the card widths changing
    // at the `sm` breakpoint; the scroll listener covers wheel, swipe and the
    // browser's own scroll-into-view when Tab reaches an off-screen card.
    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [syncEdges, athletes.length]);

  const scrollByCards = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-athlete-card]");
    const step = (card?.offsetWidth ?? 300) + CARD_GAP;
    // One card at a time on phones, two on wider viewports where a single
    // card is a barely perceptible move.
    const cards = el.clientWidth >= 768 ? 2 : 1;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * step * cards,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        onScroll={syncEdges}
        className="w-full overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex items-stretch gap-6 w-max">
          {athletes.map((athlete) => (
            <div key={athlete.id} data-athlete-card>
              <AthleteCard
                athlete={athlete}
                playingId={playingId}
                onPlayingChange={setPlayingId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow overlay, spanning only the photo band so the controls sit
          centred on the imagery rather than on the card text. It is inert
          except for the buttons themselves, so cards underneath stay
          clickable — including the video play targets. */}
      {hasOverflow && (
        <div className="pointer-events-none absolute inset-x-0 top-2 h-[220px] sm:h-[260px] z-50 flex items-center justify-between">
          <ArrowButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => scrollByCards(-1)}
          />
          <ArrowButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => scrollByCards(1)}
          />
        </div>
      )}
    </div>
  );
};

export const Athletes: React.FC = () => {
  // Read athletes from JSON
  const allAthletes: Athlete[] = (athletesData as { athletes: Athlete[] }).athletes;

  // Filter based on consent
  const consentedAthletes = allAthletes
    .filter((a) => a.consent === true)
    .sort((a, b) => a.priority - b.priority);

  // Check if we show the Dev-Only Preview
  const isDev = process.env.NODE_ENV !== "production";
  const showDevPreview = consentedAthletes.length === 0 && isDev;

  // Get active items to display
  const activeAthletes = showDevPreview
    ? allAthletes.slice(0, 4).sort((a, b) => a.priority - b.priority)
    : consentedAthletes;

  // CONSENT GATE: Hide completely in production if no athletes have consent
  if (activeAthletes.length === 0) {
    return null;
  }

  return (
    <section className="bg-ink-900 text-white py-[56px] md:py-[96px] overflow-hidden select-none relative scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-16">

        {/* Section Heading & Dev Preview Badge */}
        <AnimatedContainer
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
        >
          <SectionHeading
            eyebrow="Elite Social Proof"
            heading="Αθλητές που εμπιστεύονται τον Μιχάλη Σιούλη"
            subcopy="Κορυφαίοι Έλληνες πρωταθλητές και ερασιτέχνες αθλητές επιλέγουν τις υπηρεσίες μας για την αποκατάστασή τους."
            centered={true}
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />

          {showDevPreview && (
            <div className="bg-red-500/20 text-red-300 border border-red-500/30 rounded-btn text-xs font-semibold px-4 py-1.5 uppercase tracking-wider animate-pulse shadow-md select-none">
              ⚠️ DEV-ONLY PREVIEW MODE: ΔΕΝ ΥΠΑΡΧΟΥΝ ΑΘΛΗΤΕΣ ΜΕ ΣΥΓΚΑΤΑΘΕΣΗ (HIDES IN PRODUCTION)
            </div>
          )}
        </AnimatedContainer>

        {/* Manually driven horizontal scroller: arrow buttons step the row by
            whole cards, and every card stays in the tab order. */}
        <AnimatedContainer
          className="relative w-full"
          delay={0.1}
          initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
        >
          <AthleteScroller athletes={activeAthletes} />
        </AnimatedContainer>

      </div>
    </section>
  );
};

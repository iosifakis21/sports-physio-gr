"use client";

import React, { useRef, useState } from "react";
import { AthleteCard, Athlete } from "@/components/AthleteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { CarouselArrow } from "@/components/CarouselArrow";
import athletesData from "@/content/athletes.json";

// Matches the `gap-6` between cards; used to work out one card's scroll step.
const CARD_GAP = 24;

const AthleteScroller: React.FC<{ athletes: Athlete[] }> = ({ athletes }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Which athlete's clip is playing, if any. Lifted here so starting one card
  // stops whichever card was playing before.
  const [playingId, setPlayingId] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Handle mouse down/drag for desktop scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = startXRef.current - x;
    trackRef.current.scrollLeft = scrollLeftRef.current + walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // Reset scroll position when it reaches the end of the first copy to create seamless loop
  const handleScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const singleSetWidth = el.scrollWidth / 3; // Three copies of the list
    // If scrolled past the second copy, jump back to the first copy
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft < 0) {
      el.scrollLeft += singleSetWidth;
    }
  };

  const scrollByCards = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-athlete-card]");
    const step = (card?.offsetWidth ?? 300) + CARD_GAP;
    // One card at a time on phones, two on wider viewports
    const cards = el.clientWidth >= 768 ? 2 : 1;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * step * cards,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="cursor-grab active:cursor-grabbing"
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex items-stretch gap-6 w-max">
            {/* Render athletes three times for seamless infinite loop */}
            {[...Array(3)].map((_, copyIdx) =>
              athletes.map((athlete) => (
                <div key={`${athlete.id}-${copyIdx}`} data-athlete-card>
                  <AthleteCard
                    athlete={athlete}
                    playingId={playingId}
                    onPlayingChange={setPlayingId}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Arrow buttons — always visible and never disabled since the loop is infinite */}
      <div className="pointer-events-none absolute inset-x-0 top-2 h-[220px] sm:h-[260px] z-50 flex items-center justify-between">
        <CarouselArrow
          direction="left"
          label="Προηγούμενοι αθλητές"
          className="pointer-events-auto"
          onClick={() => scrollByCards(-1)}
        />
        <CarouselArrow
          direction="right"
          label="Επόμενοι αθλητές"
          className="pointer-events-auto"
          onClick={() => scrollByCards(1)}
        />
      </div>
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

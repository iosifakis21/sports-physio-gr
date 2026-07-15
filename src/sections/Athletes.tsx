"use client";

import React, { useRef, useState, useEffect } from "react";
import { AthleteCard, Athlete } from "@/components/AthleteCard";
import { SectionHeading } from "@/components/SectionHeading";
import athletesData from "@/content/athletes.json";

export const Athletes: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  // Handle scroll events to show/hide arrows
  const checkScrollLimits = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 5
      );
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollLimits);
      // Run initially
      checkScrollLimits();
      // Handle resize recalculations
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollLimits);
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [activeAthletes]);

  // Scroll function for desktop arrows
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const cardWidth = 320; // card width (320px) + gap
      const gap = 24;
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
      el.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-ink-900 text-white py-[56px] md:py-[96px] overflow-hidden select-none relative scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-16">
        
        {/* Section Heading & Dev Preview Badge */}
        <div className="flex flex-col items-center gap-4 text-center">
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
        </div>

        {/* Carousel Container with Absolute Arrows */}
        <div className="relative w-full group/carousel">
          
          {/* Scroll Area */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-1 md:px-4 -mx-4 md:-mx-0 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {activeAthletes.map((athlete) => (
              <AthleteCard key={athlete.id} athlete={athlete} />
            ))}
          </div>

          {/* Left Arrow Button (Desktop Only) */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white items-center justify-center shadow-lg hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-primary select-none cursor-pointer z-25 transition-all duration-200"
              aria-label="Προηγούμενοι αθλητές"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button (Desktop Only) */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white items-center justify-center shadow-lg hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-primary select-none cursor-pointer z-25 transition-all duration-200"
              aria-label="Επόμενοι αθλητές"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

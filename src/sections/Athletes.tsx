"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react";
import { AthleteCard, Athlete } from "@/components/AthleteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import athletesData from "@/content/athletes.json";

// Continuous marquee row — same mechanism as InsuranceMarquee: the row holds
// two copies of the athlete list, translating by -50% moves exactly one full
// copy before repeating, so the loop is seamless. Slower than the logo strip
// because the cards are larger.
const AthleteMarqueeRow: React.FC<{ athletes: Athlete[] }> = ({ athletes }) => {
  const [scope, animate] = useAnimate();
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!scope.current) return;

    animationRef.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      {
        duration: 85,
        ease: "linear",
        repeat: Infinity,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [animate, scope]);

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <div ref={scope} className="flex items-stretch gap-6 w-max pb-2">
        {[...athletes, ...athletes].map((athlete, idx) => (
          <AthleteCard
            key={`${athlete.id}-${idx}`}
            athlete={athlete}
            decorative={idx >= athletes.length}
          />
        ))}
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

        {/* Auto-scrolling marquee — pauses on hover, focus, and touch. Cards in
            the first copy stay keyboard-focusable; focusing one pauses the row. */}
        <AnimatedContainer
          className="relative w-full"
          delay={0.1}
          initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
        >
          <AthleteMarqueeRow athletes={activeAthletes} />
        </AnimatedContainer>

      </div>
    </section>
  );
};

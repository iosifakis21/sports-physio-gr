"use client";

import React, { useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { RatingBadge, GOOGLE_REVIEWS_URL } from "@/components/RatingBadge";
import { ReviewCard, Review } from "@/components/ReviewCard";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import reviewsData from "@/content/reviews.json";

interface MarqueeColumnProps {
  reviews: Review[];
  speed: number;
}

/**
 * Μία κάθετη στήλη κριτικών που κυλά ατέρμονα.
 *
 * Όπως και το InsuranceMarquee: το `useAnimate` του motion/react, το
 * `isPaused` state, ο IntersectionObserver και οι έξι handlers έφυγαν υπέρ
 * ενός CSS keyframe. Η ταχύτητα ανά στήλη περνά ως custom property, που τη
 * διαβάζει το `--animate-marquee-y` στο globals.css.
 */
const MarqueeColumn: React.FC<MarqueeColumnProps> = ({ reviews, speed }) => (
  <div className="marquee-viewport overflow-hidden relative h-full flex flex-col rounded-card">
    <div
      className="marquee-track animate-marquee-y flex flex-col gap-6 py-3"
      /* Inline longhand: υπερισχύει της διάρκειας που ορίζει το shorthand
         `animation` της utility, ώστε κάθε στήλη να κυλά με τον δικό της
         ρυθμό (όπως έκανε πριν το `duration` του motion). */
      style={{ animationDuration: `${speed}s` }}
    >
      {[...reviews, ...reviews].map((review, idx) => (
        <ReviewCard key={`${review.id}-${idx}`} review={review} />
      ))}
    </div>
  </div>
);

export const Reviews: React.FC = () => {
  const reviews: Review[] = reviewsData as Review[];
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    // Responsive column count: 1 on mobile, 2 on tablet (>=768px), 3 on desktop (>=1024px)
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setColumnCount(lg.matches ? 3 : md.matches ? 2 : 1);
    update();

    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  // Distribute reviews round-robin across the active number of columns
  const columns: Review[][] = Array.from({ length: columnCount }, () => []);
  reviews.forEach((review, i) => {
    columns[i % columnCount].push(review);
  });

  return (
    <section id="axiologiseis" className="py-[56px] md:py-[96px] bg-surface-alt border-y border-ink-900/5 select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-16">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Αξιολογήσεις"
          heading="Τι Λένε οι Ασθενείς Μας"
          subcopy="Η εμπειρία των ανθρώπων που μας εμπιστεύτηκαν είναι η καλύτερη εγγύηση για τα αποτελέσματα της δουλειάς μας."
        />

        {/* Aggregate Ratings & Google Link Block */}
        <AnimatedContainer
          className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-surface p-6 rounded-card border border-ink-900/5 max-w-2xl mx-auto w-full shadow-sm"
          initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
        >
          <RatingBadge />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="font-sans text-sm text-ink-600 font-medium">
              Είστε ευχαριστημένοι από τις υπηρεσίες μας;
            </span>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-bold text-primary hover:text-primary-hover underline focus:outline focus:outline-2 focus:outline-primary rounded p-0.5 transition-colors"
            >
              Δείτε όλες τις αξιολογήσεις στο Google →
            </a>
          </div>
        </AnimatedContainer>

        {/* Review Layout — single fade-in for the whole marquee/grid container.
            Individual review cards are intentionally NOT wrapped in their own
            scroll animation, since that would conflict with the marquee's
            continuous scroll and hover/focus/touch pause behavior. */}
        <AnimatedContainer
          delay={0.1}
          initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
        >
          {/* Taller than a single card at either breakpoint, so even the longest
              review is fully readable as it passes through the window. */}
          <div className="relative h-[680px] md:h-[760px] overflow-hidden">
            {/* Elegant fading gradients at the top and bottom of the marquee */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-surface-alt to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-surface-alt to-transparent pointer-events-none z-10" />

            <div
              className="grid gap-6 md:gap-8 h-full"
              style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
            >
              {columns.map((colReviews, idx) => (
                <MarqueeColumn
                  key={`${columnCount}-${idx}`}
                  reviews={colReviews}
                  // Duration scales with card count so scroll speed stays consistent,
                  // with a small per-column offset for a natural staggered feel
                  speed={colReviews.length * 10 + idx * 2}
                />
              ))}
            </div>
          </div>
        </AnimatedContainer>

      </div>
    </section>
  );
};


"use client";

import React, { useEffect, useState, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewCard, Review } from "@/components/ReviewCard";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import reviewsData from "@/content/reviews.json";

interface MarqueeColumnProps {
  reviews: Review[];
  speed: number;
}

const MarqueeColumn: React.FC<MarqueeColumnProps> = ({ reviews, speed }) => {
  const [scope, animate] = useAnimate();
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!scope.current) return;

    // Start infinite scrolling animation using motion's animate function
    animationRef.current = animate(
      scope.current,
      { y: ["0%", "-50%"] },
      {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [speed, animate, scope]);

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
      className="overflow-hidden relative h-full flex flex-col rounded-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      // Hold-to-pause on touch devices so mobile users can read a card
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <div ref={scope} className="flex flex-col gap-6 py-3">
        {[...reviews, ...reviews].map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  const reviews: Review[] = reviewsData as Review[];
  const [isMounted, setIsMounted] = useState(false);
  const [columnCount, setColumnCount] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);

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

  const showMarquee = isMounted && !prefersReducedMotion;

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-surface p-6 rounded-card border border-ink-900/5 max-w-2xl mx-auto w-full shadow-sm">
          <RatingBadge />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="font-sans text-sm text-ink-600 font-medium">
              Είστε ευχαριστημένοι από τις υπηρεσίες μας;
            </span>
            <a
              href="https://search.google.com/local/writereview?placeid=placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-bold text-primary hover:text-primary-hover underline focus:outline focus:outline-2 focus:outline-primary rounded p-0.5 transition-colors"
            >
              Δείτε όλες τις αξιολογήσεις στο Google →
            </a>
          </div>
        </div>

        {/* Review Layout */}
        {showMarquee ? (
          <div className="relative h-[650px] overflow-hidden">
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
                  speed={colReviews.length * 8 + idx * 2}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Stacked/Grid Static Layout for Mobile, SSR, or Prefers Reduced Motion */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};


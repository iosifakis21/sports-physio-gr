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
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    
    // Check if the screen is desktop (min-width: 1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Split reviews into 3 columns for desktop marquee
  // Column 1: Reviews 1 & 4
  // Column 2: Reviews 2 & 5
  // Column 3: Reviews 3 & 6
  const col1 = [reviews[0], reviews[3]];
  const col2 = [reviews[1], reviews[4]];
  const col3 = [reviews[2], reviews[5]];

  const showMarquee = isMounted && isDesktop && !prefersReducedMotion;

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
            
            <div className="grid grid-cols-3 gap-8 h-full">
              <MarqueeColumn reviews={col1} speed={15} />
              <MarqueeColumn reviews={col2} speed={19} />
              <MarqueeColumn reviews={col3} speed={17} />
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


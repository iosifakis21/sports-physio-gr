import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewCard, Review } from "@/components/ReviewCard";
import reviewsData from "@/content/reviews.json";

export const Reviews: React.FC = () => {
  const reviews: Review[] = reviewsData as Review[];

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
              href="https://search.google.com/local/writereview?placeid=placeholder" // placeholder review write link
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-bold text-primary hover:text-primary-hover underline focus:outline focus:outline-2 focus:outline-primary rounded p-0.5 transition-colors"
            >
              Δείτε όλες τις αξιολογήσεις στο Google →
            </a>
          </div>
        </div>

        {/* 3-column desktop grid / 1-column stacked mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </section>
  );
};

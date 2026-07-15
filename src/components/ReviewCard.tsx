import React from "react";

export interface Review {
  id: string;
  authorName: string;
  text: string;
  conditionTreated?: string;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      tabIndex={0}
      className="bg-surface border border-ink-900/5 rounded-card p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline focus:outline-2 focus:outline-primary"
      aria-label={`Αξιολόγηση από τον/την ${review.authorName}. Βαθμολογία 5 αστέρια. Κείμενο: ${review.text}`}
    >
      {/* Header Info */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="font-display font-bold text-base text-ink-900">
            {review.authorName}
          </span>
          {review.conditionTreated && (
            <span className="text-xs font-semibold text-primary uppercase block mt-0.5 tracking-wider font-sans">
              🩺 {review.conditionTreated}
            </span>
          )}
        </div>

        {/* 5-star rating */}
        <div className="flex gap-0.5 text-amber-500" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 2.903a.75.75 0 011.424 0l2.082 5.007 5.404.433a.75.75 0 01.42 1.282l-4.002 3.493 1.21 5.24a.75.75 0 01-1.093.796L12 16.34l-4.752 2.507a.75.75 0 01-1.093-.796l1.21-5.24-4.002-3.493a.75.75 0 01.42-1.282l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed italic">
        {review.text}
      </p>
    </div>
  );
};

import React from "react";
import Image from "next/image";

export interface Review {
  id: string;
  authorName: string;
  /** Reviewer avatar as uploaded on their Google profile. */
  photo: string;
  /** Google "Local Guide" status, shown as a prefix on the reviewer meta line. */
  localGuide?: boolean;
  reviewCount: number;
  /** Number of photos the reviewer has contributed, when Google shows one. */
  photoCount?: number;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

/** Greek plurals for the reviewer meta line ("1 κριτική" vs "34 κριτικές"). */
const reviewsLabel = (count: number) =>
  `${count} ${count === 1 ? "κριτική" : "κριτικές"}`;

const photosLabel = (count: number) =>
  `${count} ${count === 1 ? "φωτογραφία" : "φωτογραφίες"}`;

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const meta = [
    review.localGuide ? "Local Guide" : null,
    reviewsLabel(review.reviewCount),
    review.photoCount ? photosLabel(review.photoCount) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      tabIndex={0}
      className="bg-surface border border-ink-900/5 rounded-card p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline focus:outline-2 focus:outline-primary"
      aria-label={`Αξιολόγηση από τον/την ${review.authorName}. ${meta}. Βαθμολογία ${review.rating} αστέρια. Κείμενο: ${review.text}`}
    >
      {/* Header: reviewer photo, name, Google badge info and rating */}
      <div className="flex items-start gap-3">
        <Image
          src={review.photo}
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          sizes="44px"
          // ΗΤΑΝ `loading="eager"`. Στο Next 16 αυτό βάζει την εικόνα σε
          // `<link rel="preload">` στο <head>: και τα 9 avatar των κριτικών
          // — 44px το καθένα, πολύ κάτω από το fold — προφορτώνονταν μαζί με
          // το στοιχείο LCP, σε αργό 4G.
          //
          // Το προεπιλεγμένο lazy τα ξεκινά όταν πλησιάσουν το viewport, πολύ
          // πριν φανούν· είναι 2–11 KB το καθένα και ο γκρίζος κύκλος από
          // κάτω (`bg-ink-900/5`) καλύπτει το ενδιάμεσο.
          className="w-11 h-11 rounded-full object-cover flex-shrink-0 bg-ink-900/5"
        />

        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-display font-bold text-base text-ink-900 leading-tight break-words">
            {review.authorName}
          </span>

          <span className="font-sans text-xs text-ink-600/80 leading-tight">
            {meta}
          </span>

          {/* Star rating */}
          <div className="flex gap-0.5 text-amber-500 mt-0.5" aria-hidden="true">
            {[...Array(review.rating)].map((_, i) => (
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
      </div>

      {/* Review Text */}
      <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed italic">
        {review.text}
      </p>
    </div>
  );
};

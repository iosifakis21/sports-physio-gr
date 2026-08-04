import React from "react";

/** The practice's Google Maps listing, opened on the reviews tab. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/SportsPhysio+Michalis+Sioulis+%CE%A6%CF%85%CF%83%CE%B9%CE%BA%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82+-+%CE%A7%CE%B5%CE%B9%CF%81%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82/@38.0635736,23.7635202,17z/data=!4m8!3m7!1s0x14a198a8a2813a6d:0xd9d5b39abdfa83ff!8m2!3d38.0635736!4d23.7660951!9m1!1b1!16s%2Fg%2F11g889688n";

interface RatingBadgeProps {
  className?: string;
  href?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  className = "",
  href = GOOGLE_REVIEWS_URL,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-surface border border-ink-900/10 shadow-md rounded-btn px-4 py-2.5 hover:shadow-lg transition-shadow duration-200 focus:outline focus:outline-2 focus:outline-primary select-none ${className}`}
      aria-label="Βαθμολογία 5.0 στα 5.0 αστέρια στο Google με βάση 73 αξιολογήσεις"
    >
      <div className="flex flex-col">
        {/* Star row */}
        <div className="flex gap-0.5 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4.5 h-4.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.788 2.903a.75.75 0 011.424 0l2.082 5.007 5.404.433a.75.75 0 01.42 1.282l-4.002 3.493 1.21 5.24a.75.75 0 01-1.093.796L12 16.34l-4.752 2.507a.75.75 0 01-1.093-.796l1.21-5.24-4.002-3.493a.75.75 0 01.42-1.282l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <span className="text-xs font-semibold text-ink-900 mt-0.5 font-sans leading-none">
          5.0 · Βάσει 73 αξιολογήσεων
        </span>
      </div>
      <div className="border-l border-ink-900/10 pl-3 flex items-center" aria-hidden="true">
        {/* Google G icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5.5 h-5.5"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>
    </a>
  );
};

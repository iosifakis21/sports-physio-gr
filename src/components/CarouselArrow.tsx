import React from "react";

const ChevronIcon: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "left" ? "M15.75 19.5 8.25 12l7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
    />
  </svg>
);

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  /** Περιγραφή για αναγνώστες οθόνης — το κουμπί δείχνει μόνο ένα βέλος. */
  label: string;
  className?: string;
}

/**
 * The round dark chevron button used by every arrow-driven carousel on the
 * site (the athletes row, the team card). Shared so the two stay visually
 * identical; a native <button>, so Enter/Space and focus come for free.
 */
export const CarouselArrow: React.FC<CarouselArrowProps> = ({
  direction,
  onClick,
  label,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-lg transition-all duration-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary bg-slate-900/90 border-white/20 text-white cursor-pointer hover:bg-primary hover:border-primary hover:scale-105 active:scale-95 ${className}`}
  >
    <ChevronIcon direction={direction} />
  </button>
);

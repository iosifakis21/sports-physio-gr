import React from "react";

interface CheckItemProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const CheckItem: React.FC<CheckItemProps> = ({
  children,
  text,
  className = "",
}) => {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center mt-0.5" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </span>
      <span className="text-base font-sans text-ink-600 leading-normal">
        {children || text}
      </span>
    </div>
  );
};

import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  icon,
}) => {
  return (
    <div
      className={`bg-surface border border-ink-900/5 rounded-card p-6 md:p-8 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5 select-none" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};

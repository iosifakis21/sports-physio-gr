import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subcopy?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subcopy,
  centered = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${centered ? "text-center items-center" : "text-left items-start"} ${className}`}>
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-ink-900 font-display tracking-tight">
        {heading}
      </h2>
      {subcopy && (
        <p className="mt-2 text-base md:text-lg text-ink-600 font-sans max-w-2xl leading-relaxed">
          {subcopy}
        </p>
      )}
    </div>
  );
};

import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subcopy?: string;
  centered?: boolean;
  className?: string;
  /**
   * Επίπεδο επικεφαλίδας. Προεπιλογή `h2`, που είναι το σωστό για τις
   * ενότητες μέσα σε μια σελίδα που έχει ήδη δικό της h1.
   *
   * Οι αυτοτελείς σελίδες που χρησιμοποιούν το SectionHeading ως ΜΟΝΑΔΙΚΗ
   * τους επικεφαλίδα (π.χ. η /politiki-aporritou) πρέπει να περνούν `"h1"`:
   * αλλιώς η σελίδα μένει χωρίς h1 και το axe το αναφέρει ως
   * `page-has-heading-one`.
   */
  as?: "h1" | "h2";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subcopy,
  centered = true,
  className = "",
  as: Heading = "h2",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${centered ? "text-center items-center" : "text-left items-start"} ${className}`}>
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display">
          {eyebrow}
        </span>
      )}
      <Heading className="text-3xl md:text-4xl font-extrabold text-ink-900 font-display tracking-tight">
        {heading}
      </Heading>
      {subcopy && (
        <p className="mt-2 text-base md:text-lg text-ink-600 font-sans max-w-2xl leading-relaxed">
          {subcopy}
        </p>
      )}
    </div>
  );
};

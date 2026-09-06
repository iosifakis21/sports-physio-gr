import React from "react";
import Image from "next/image";
import insurersData from "@/content/insurers.json";

interface Insurer {
  name: string;
  logo: string;
}

// Intrinsic pixel dimensions of each source webp, so next/image can scale every
// logo to a shared height (h-10 / h-12) with w-auto and no distortion or
// letterboxing. Keyed by logo path; JSON stays { name, logo } as specified.
const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/NN_Group-logo.webp": { width: 298, height: 169 },
  "/images/MetLife-logo.webp": { width: 400, height: 88 },
  "/images/interlife-logo.webp": { width: 400, height: 267 },
  "/images/Interamerican-logo.webp": { width: 400, height: 51 },
  "/images/groupama-logo.webp": { width: 400, height: 107 },
  "/images/Generali_group-logo.webp": { width: 400, height: 329 },
  "/images/eurolife_logo.webp": { width: 676, height: 218 },
  "/images/ethniki-asfalistiki-logo.webp": { width: 321, height: 157 },
  "/images/ERGO-logo.webp": { width: 400, height: 180 },
  "/images/Allianz-logo.webp": { width: 400, height: 99 },
};

const LogoImage: React.FC<{ insurer: Insurer; decorative?: boolean }> = ({
  insurer,
  decorative = false,
}) => {
  const dim = LOGO_DIMENSIONS[insurer.logo] ?? { width: 200, height: 60 };

  // Το `sizes` ήταν σταθερό «120px / 160px» για όλα τα λογότυπα, αλλά αυτά
  // εμφανίζονται με σταθερό ΥΨΟΣ (h-10 = 40px, md:h-12 = 48px) και αυτόματο
  // πλάτος — άρα το πραγματικό πλάτος εξαρτάται από την αναλογία του καθενός.
  //
  // Το Generali (400×329) πιάνει 58px και κατέβαζε παραλλαγή 256px· το
  // PageSpeed το ανέφερε ως 23,7 KiB σπατάλη σε ένα μόνο λογότυπο. Αντίθετα,
  // ένα πολύ πλατύ λογότυπο (400×51 → 376px) υποφορτωνόταν και έβγαινε θολό.
  //
  // Υπολογίζοντας το πλάτος από την αναλογία, κάθε λογότυπο ζητά αυτό που
  // πραγματικά χρειάζεται.
  const widthAt = (heightPx: number) =>
    Math.ceil((heightPx * dim.width) / dim.height);
  const sizes = `(max-width: 768px) ${widthAt(40)}px, ${widthAt(48)}px`;

  return (
    <Image
      src={insurer.logo}
      alt={decorative ? "" : insurer.name}
      aria-hidden={decorative || undefined}
      width={dim.width}
      height={dim.height}
      sizes={sizes}
      className="h-10 md:h-12 w-auto object-contain opacity-70 shrink-0"
    />
  );
};

/**
 * Μία λωρίδα λογοτύπων που κυλά ατέρμονα.
 *
 * ΗΤΑΝ client component με `useAnimate` του motion/react, `isPaused` state,
 * IntersectionObserver και έξι handlers ποντικιού/αφής/εστίασης. Όλα αυτά
 * αντικαταστάθηκαν από ένα CSS keyframe και τρεις κανόνες `:hover/:focus-
 * within/:active` — η κίνηση τρέχει πλέον στον compositor, το αρχείο δεν
 * χρειάζεται καθόλου JavaScript, και έγινε server component.
 */
const MarqueeRow: React.FC<{ insurers: Insurer[] }> = ({ insurers }) => (
  <div className="marquee-viewport w-full overflow-hidden">
    <div className="marquee-track animate-marquee-x flex items-center gap-12 md:gap-20 w-max">
      {[...insurers, ...insurers].map((insurer, idx) => (
        <LogoImage
          key={`${insurer.name}-${idx}`}
          insurer={insurer}
          /* Το δεύτερο αντίγραφο υπάρχει μόνο για να κλείνει ο βρόχος
             αδιόρατα — για τους αναγνώστες οθόνης είναι διακοσμητικό. */
          decorative={idx >= insurers.length}
        />
      ))}
    </div>
  </div>
);

export const InsuranceMarquee: React.FC = () => {
  const insurers = insurersData as Insurer[];

  return (
    <section className="bg-surface-alt border-y border-ink-900/5 py-8 md:py-10 w-full select-none overflow-hidden">
      <div className="flex flex-col gap-6">
        {/* Eyebrow label — matches SectionHeading eyebrow treatment */}
        <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display text-center px-4">
          ΔΕΚΤΕΣ ΟΛΕΣ ΟΙ ΑΣΦΑΛΙΣΤΙΚΕΣ
        </span>

        <MarqueeRow insurers={insurers} />
      </div>
    </section>
  );
};

import React from "react";
import ReactDOM from "react-dom";
import { getImageProps } from "next/image";
import { Button } from "@/components/Button";
import { CheckItem } from "@/components/CheckItem";
import { RatingBadge } from "@/components/RatingBadge";
import { HeroReveal } from "@/components/HeroReveal";
import { TypewriterCycle } from "@/components/TypewriterCycle";

/**
 * Η φωτογραφία του hero σε δύο κοψίματα (art direction).
 *
 * ΓΙΑΤΙ `<picture>` ΚΑΙ ΟΧΙ ΔΥΟ `<Image>`:
 * Πριν υπήρχαν δύο `<Image>` — μία με `lg:hidden`, μία με `hidden lg:block` —
 * και οι δύο με `priority`. Το `display:none` ΔΕΝ εμποδίζει τη λήψη, οπότε στο
 * κινητό κατέβαιναν και τα δύο αρχεία (91 KB + 123 KB) και επιπλέον έμπαιναν
 * ΚΑΙ ΤΑ ΔΥΟ σε `<link rel="preload">`, ανταγωνιζόμενα το ίδιο το στοιχείο LCP
 * πάνω σε αργό 4G.
 *
 * Με `<picture>` + `<source media>` ο browser κατεβάζει ΑΚΡΙΒΩΣ ΜΙΑ εικόνα ανά
 * viewport, και ο preload scanner τη βρίσκει στο markup σχεδόν τόσο νωρίς όσο
 * ένα preload — χωρίς όμως καθόλου χαμένα bytes. Είναι το μοτίβο που
 * τεκμηριώνει το Next 16 για art direction (`getImageProps`).
 *
 * Το `getImageProps` παράγει τα σωστά `srcSet` του image optimizer, ώστε να μη
 * γράφονται στο χέρι URL της μορφής `/_next/image?...`.
 */
const HERO_COMMON = { alt: "", quality: 65, sizes: "100vw" } as const;

const {
  props: { srcSet: heroDesktopSrcSet },
} = getImageProps({ ...HERO_COMMON, src: "/images/hero.webp", width: 1838, height: 856 });

const {
  props: { srcSet: heroMobileSrcSet, ...heroImgProps },
} = getImageProps({
  ...HERO_COMMON,
  src: "/images/heromobile.webp",
  width: 941,
  height: 1672,
});

export const Hero: React.FC = () => {
  /* Preload ΜΕ `media`, ένα ανά breakpoint.
     ----------------------------------------------------------------------
     Το `<picture>` από μόνο του αφήνει τον browser να ανακαλύψει την εικόνα
     μόνο όταν ο parser φτάσει στο σώμα. Αυτά τα δύο preload τη μετακινούν στο
     <head>, ΑΛΛΑ — χάρη στο `media` — ο browser κατεβάζει μόνο εκείνο που
     ταιριάζει στο viewport του.

     Έτσι κρατάμε το όφελος του παλιού `priority` (πρώιμη έναρξη λήψης) χωρίς
     το κόστος του (τη δεύτερη, αόρατη εικόνα των 123 KB).

     Χρησιμοποιείται το `ReactDOM.preload` και όχι σκέτο `<link>`: το React 19
     ΔΕΝ ανεβάζει τα `<link rel="preload">` στο <head> — μένουν στο σώμα, όπου
     ο preload scanner τα βρίσκει αργότερα.

     Τα υπόλοιπα 10 preload που υπήρχαν (λογότυπο + 9 avatar κριτικών) έχουν
     αφαιρεθεί: κανένα τους δεν ήταν ποτέ το στοιχείο LCP. */
  ReactDOM.preload(heroImgProps.src, {
    as: "image",
    media: "(max-width: 1023px)",
    imageSrcSet: heroMobileSrcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
  });
  ReactDOM.preload(heroImgProps.src, {
    as: "image",
    media: "(min-width: 1024px)",
    imageSrcSet: heroDesktopSrcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
  });

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-screen flex items-center py-6 sm:py-8 md:py-20 z-10">
      {/* Background Photo & Overlay */}
      {/* Mobile / tablet photo, zoomed in and shifted right so the doctor's
          upper body/face sits in the lighter, right-hand side of the overlay
          gradient (mirroring the desktop crop). */}
      {/* Μία εικόνα ανά viewport — βλ. το σχόλιο στο `HERO_COMMON` παραπάνω.
          Το κόψιμο για κινητό είναι ζουμαρισμένο και μετατοπισμένο δεξιά ώστε
          το πρόσωπο να πέφτει στη φωτεινή πλευρά του gradient· στο desktop η
          φωτογραφία είναι ήδη καδραρισμένη σωστά, οπότε οι μετασχηματισμοί
          μηδενίζονται στο `lg:`. */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={heroDesktopSrcSet} sizes="100vw" />
        <source srcSet={heroMobileSrcSet} sizes="100vw" />
        <img
          {...heroImgProps}
          /* Το `alt=""` έρχεται ήδη μέσα από το spread· δηλώνεται ξανά ρητά
             επειδή ο κανόνας jsx-a11y δεν βλέπει μέσα σε spread. Διακοσμητική
             εικόνα: το νόημα το κουβαλά το κείμενο δίπλα της. */
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[45%_22%] scale-[1.6] translate-x-[22%] lg:object-center lg:scale-100 lg:translate-x-0 z-0"
        />
      </picture>
      {/* Mobile overlay: horizontal gradient, darkest on the left behind the
          copy/CTA and clearing towards the right (same logic as desktop). */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 lg:hidden"
        aria-hidden="true"
      />
      {/* Desktop overlay: darkest on the left behind the text, clearing to
          near-transparent on the right so the doctor reads through. */}
      <div
        className="absolute inset-0 z-0 hidden lg:block bg-gradient-to-r from-black/80 via-black/45 to-black/5"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        {/* Left column - Text, Checklist, and CTA */}
        <div className="w-full lg:max-w-[50%] flex flex-col gap-5 md:gap-7 text-left">

          <HeroReveal delay={0}>
            <h1 className="text-[clamp(1rem,5.2vw,1.25rem)] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold font-display leading-snug text-white tracking-tight min-h-[80px] sm:min-h-[80px] md:min-h-[90px] lg:min-h-[90px] flex flex-col justify-start">
              Εξειδικευμένη Φυσικοθεραπεία για{" "}
              <span className="md:whitespace-nowrap">
                <TypewriterCycle
                  className="text-[clamp(1rem,5.2vw,1.25rem)] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl"
                  words={["Εξάληψη Πόνου", "Τραυματισμούς", "Μυοσκελετική Αποκατάσταση", "Αθλητικές Κακώσεις", "Ασφαλή Επιστροφή στη Καθημερινότητα"]}
                  srText="Εξάληψη Πόνου, Τραυματισμούς, Μυοσκελετική Αποκατάσταση, Αθλητικές Κακώσεις και Ασφαλή Επιστροφή στη Καθημερινότητα"
                  allowWrap={true}
                />
              </span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.1}>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
              Με επιστημονική προσέγγιση και εξατομικευμένη φροντίδα, σας βοηθάμε να επιστρέψετε εκεί που ανήκετε: στην καλύτερη εκδοχή του εαυτού σας.
            </p>
          </HeroReveal>

          {/* 4 Trust Checkmarks (Styled with cascading white text color) */}
          <HeroReveal delay={0.2}>
            {/* Mobile/tablet only: slightly smaller but bold check text.
                At lg+ the arbitrary variants reset to the CheckItem defaults. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 md:gap-3.5 text-slate-200 my-2 [&_span]:!text-slate-200 [&>div>span:last-child]:text-sm [&>div>span:last-child]:font-semibold lg:[&>div>span:last-child]:text-base lg:[&>div>span:last-child]:font-normal">
              <CheckItem text="20+ χρόνια κλινικής εμπειρίας και συνεχή εξειδίκευση" />
              <CheckItem text="Επίσημος cutman παγκόσμιων πρωταθλητών πυγμαχίας & kickboxing" />
              <CheckItem text="Δεκτές όλες οι ιδιωτικές ασφαλιστικές" />
              <CheckItem text="Κράτηση σε λιγότερο από 1 λεπτό" />
            </div>
          </HeroReveal>

          {/* Action Button & Rating Badge on Mobile/Tablet */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-4 mt-2">
            <HeroReveal delay={0.3}>
              <Button
                variant="primary"
                label="Κλείστε Ραντεβού"
                calPopup
                href="#kleiste-rantevou"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                }
              />
            </HeroReveal>
            {/* Rating Badge shown below/alongside CTA on mobile and tablet */}
            <HeroReveal delay={0.4} className="lg:hidden">
              <RatingBadge />
            </HeroReveal>
          </div>
        </div>

        {/* Right column - Floating Rating Badge on Desktop */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0">
          <HeroReveal delay={0.4}>
            <RatingBadge />
          </HeroReveal>
        </div>
      </div>
    </section>
  );
};

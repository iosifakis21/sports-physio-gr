import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CheckItem } from "@/components/CheckItem";
import { RatingBadge } from "@/components/RatingBadge";
import { HeroReveal } from "@/components/HeroReveal";
import { TypewriterCycle } from "@/components/TypewriterCycle";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-screen flex items-center py-6 sm:py-8 md:py-20 z-10">
      {/* Background Photo & Overlay */}
      {/* Mobile / tablet photo, zoomed and cropped so the doctor's upper
          body/face reads clearly, positioned left-of-centre in frame. */}
      <Image
        src="/images/heromobile.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[45%_22%] scale-125 z-0 lg:hidden"
        aria-hidden="true"
      />
      {/* Desktop photo (doctor sits on the right-hand side of this crop) */}
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover z-0 hidden lg:block"
        aria-hidden="true"
      />
      {/* Mobile overlay: uniform dark tint across the whole image so the
          copy/CTA stay legible regardless of what's behind them. */}
      <div
        className="absolute inset-0 z-0 bg-black/60 lg:hidden"
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
            <h1 className="text-[clamp(1rem,5.2vw,1.25rem)] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold font-display leading-snug text-white tracking-tight">
              Εξειδικευμένη Φυσικοθεραπεία για{" "}
              {/* Sized a notch below the line above it so that even the longest
                  phrase in the cycle stays on a single (second) line on desktop. */}
              <span className="md:whitespace-nowrap">
                <TypewriterCycle
                  className="text-[clamp(0.8rem,4.35vw,1.05rem)] sm:text-2xl md:text-3xl lg:text-[1.75rem] xl:text-4xl"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 md:gap-3.5 text-slate-200 my-2 [&_span]:!text-slate-200">
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

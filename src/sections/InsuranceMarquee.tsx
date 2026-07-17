"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAnimate } from "motion/react";
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
  "/images/MetLife-logo.webp": { width: 512, height: 112 },
  "/images/interlife-logo.webp": { width: 400, height: 267 },
  "/images/Interamerican-logo.webp": { width: 928, height: 118 },
  "/images/groupama-logo.webp": { width: 800, height: 214 },
  "/images/Generali_group-logo.webp": { width: 1095, height: 900 },
  "/images/eurolife_logo.webp": { width: 676, height: 218 },
  "/images/ethniki-asfalistiki-logo.webp": { width: 321, height: 157 },
  "/images/ERGO-logo.webp": { width: 1000, height: 449 },
  "/images/Allianz-logo.webp": { width: 1666, height: 413 },
};

const LogoImage: React.FC<{ insurer: Insurer; decorative?: boolean }> = ({
  insurer,
  decorative = false,
}) => {
  const dim = LOGO_DIMENSIONS[insurer.logo] ?? { width: 200, height: 60 };
  return (
    <Image
      src={insurer.logo}
      alt={decorative ? "" : insurer.name}
      aria-hidden={decorative || undefined}
      width={dim.width}
      height={dim.height}
      sizes="(max-width: 768px) 120px, 160px"
      className="h-10 md:h-12 w-auto object-contain grayscale opacity-70 shrink-0"
    />
  );
};

const MarqueeRow: React.FC<{ insurers: Insurer[] }> = ({ insurers }) => {
  const [scope, animate] = useAnimate();
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!scope.current) return;

    // Seamless loop: the row holds two copies of the list, translating by -50%
    // moves exactly one full copy before repeating.
    animationRef.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [animate, scope]);

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <div ref={scope} className="flex items-center gap-12 md:gap-20 w-max">
        {[...insurers, ...insurers].map((insurer, idx) => (
          <LogoImage
            key={`${insurer.name}-${idx}`}
            insurer={insurer}
            decorative={idx >= insurers.length}
          />
        ))}
      </div>
    </div>
  );
};

export const InsuranceMarquee: React.FC = () => {
  const insurers = insurersData as Insurer[];

  // Detect reduced-motion via matchMedia + a mount gate. Until mounted (and on
  // the server) we render the static wrapped row, so reduced-motion users never
  // see the animated variant and there is no hydration flash.
  const [reduceMotion, setReduceMotion] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    setMounted(true);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const animateMarquee = mounted && !reduceMotion;

  return (
    <section className="bg-surface-alt border-y border-ink-900/5 py-8 md:py-10 w-full select-none overflow-hidden">
      <div className="flex flex-col gap-6">
        {/* Eyebrow label — matches SectionHeading eyebrow treatment */}
        <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display text-center px-4">
          ΔΕΚΤΕΣ ΟΛΕΣ ΟΙ ΑΣΦΑΛΙΣΤΙΚΕΣ
        </span>

        {animateMarquee ? (
          <MarqueeRow insurers={insurers} />
        ) : (
          /* Static wrapped row for reduced-motion / SSR / first paint */
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {insurers.map((insurer) => (
              <LogoImage key={insurer.name} insurer={insurer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

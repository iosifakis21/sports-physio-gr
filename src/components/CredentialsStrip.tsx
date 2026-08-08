"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Credential {
  id: string;
  logo: string;
  /** Intrinsic pixel size of the source file, so next/image scales it to a
      shared box height with w-auto and no distortion. */
  width: number;
  height: number;
  /** Full name of the organisation, revealed on hover/tap. */
  organisation: string;
  /** Title held there, with the year it was obtained, where there is one. */
  detail?: string;
}

const CREDENTIALS: Credential[] = [
  {
    id: "psf",
    logo: "/images/credentials/silogopsf.jpeg",
    width: 447,
    height: 447,
    organisation: "Πανελλήνιος Σύλλογος Φυσικοθεραπευτών Ελλάδος",
    detail: "Ενεργό μέλος",
  },
  {
    id: "omt",
    logo: "/images/credentials/homtd_hellas_ompt.jpg",
    width: 500,
    height: 500,
    organisation: "Πανελλήνιος Σύλλογος Χειροθεραπευτών Ελλάδος",
    detail: "MIDTERM-OMT, 2008",
  },
  {
    id: "efea",
    logo: "/images/credentials/efea.png",
    width: 300,
    height: 156,
    organisation: "Ελληνική Εταιρεία Αλγολογίας (ΕΦΕΑ)",
    detail: "Εξειδικευμένος Βελονιστής, 2012",
  },
  {
    id: "kta",
    logo: "/images/credentials/kinesio-kta-logo.jpg",
    width: 200,
    height: 200,
    organisation: "Παγκόσμια Ομοσπονδία KinesioTaping (KTA)",
    detail: "Μέλος",
  },
  {
    id: "ica",
    logo: "/images/credentials/ica.jpeg",
    width: 447,
    height: 447,
    organisation: "International Cutmen Association (ICA)",
    detail: "Εκπρόσωπος Ελλάδας από το 2017",
  },
  {
    id: "wca",
    logo: "/images/credentials/wca.png",
    width: 1920,
    height: 1674,
    organisation: "World Cutman Association (WCA)",
    detail: "Αντιπρόεδρος",
  },
];

/**
 * Logos of the bodies Μιχάλης Σιούλης is certified by or serves on.
 *
 * Reveal mechanics are the AthleteCard hoverPhoto pattern: pointer devices
 * swap on mouseenter/mouseleave, touch devices swap on touchstart and stay
 * swapped until the next touch lands outside the strip — reverting on touchend
 * would make the reveal invisible on a phone, since the finger lifts almost
 * immediately.
 *
 * Logos sit in grayscale by default, matching the understated treatment the
 * insurer marquee gives its logos, and come up to full colour on reveal — six
 * unrelated brand palettes at rest would fight the section's calm light
 * background, and the desaturated-to-colour lift doubles as the affordance.
 */
export const CredentialsStrip: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const onTouchElsewhere = (event: TouchEvent) => {
      const target = event.target;
      if (target instanceof Node && stripRef.current?.contains(target)) return;
      setActiveId(null);
    };
    document.addEventListener("touchstart", onTouchElsewhere);
    return () => document.removeEventListener("touchstart", onTouchElsewhere);
  }, [activeId]);

  const active = CREDENTIALS.find((c) => c.id === activeId) ?? null;

  return (
    <div ref={stripRef} className="w-full border-t border-ink-900/10 pt-6 flex flex-col gap-4">
      <p className="font-sans font-semibold text-xs uppercase tracking-wider text-ink-600">
        Πιστοποιήσεις & Φορείς
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
        {CREDENTIALS.map((cred) => {
          const isActive = cred.id === activeId;
          return (
            <button
              key={cred.id}
              type="button"
              onMouseEnter={() => setActiveId(cred.id)}
              onMouseLeave={() => setActiveId((current) => (current === cred.id ? null : current))}
              onTouchStart={() => setActiveId(cred.id)}
              onFocus={() => setActiveId(cred.id)}
              onBlur={() => setActiveId((current) => (current === cred.id ? null : current))}
              onClick={() => setActiveId(cred.id)}
              aria-label={cred.detail ? `${cred.organisation} — ${cred.detail}` : cred.organisation}
              className={`bg-white rounded-card border p-2.5 flex items-center justify-center aspect-[4/3] cursor-pointer transition-all duration-300 ease-out focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary ${
                isActive
                  ? "border-primary/40 shadow-md -translate-y-0.5"
                  : "border-ink-900/10 shadow-sm"
              }`}
            >
              <Image
                src={cred.logo}
                alt=""
                aria-hidden="true"
                width={cred.width}
                height={cred.height}
                sizes="120px"
                className={`max-h-full max-w-full w-auto object-contain transition-all duration-300 ease-out ${
                  isActive ? "grayscale-0 opacity-100" : "grayscale opacity-85"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Shared reveal panel. Kept below the grid rather than as a per-logo
          popup so the text never gets clipped by the section edge on a 375px
          screen, where the outer logos sit hard against the gutter. min-h
          reserves the space, so revealing never shifts the layout. */}
      <div className="min-h-[3.25rem] sm:min-h-[2.75rem]" aria-live="polite">
        <div
          className={`transition-all duration-300 ease-out ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {active && (
            <>
              <p className="font-sans font-semibold text-sm text-ink-900 leading-snug">
                {active.organisation}
              </p>
              {active.detail && (
                <p className="font-sans text-sm text-primary leading-snug mt-0.5">{active.detail}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

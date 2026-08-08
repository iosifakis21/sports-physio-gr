"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Credential {
  id: string;
  logo: string;
  /** Full name of the organisation, revealed on hover/tap. */
  organisation: string;
  /** Title held there, with the year it was obtained, where there is one. */
  detail?: string;
  /** Optical-size correction, as a fraction of the shared logo box. Every logo
      is fitted to the same square, but the source files carry different amounts
      of dead margin baked around the artwork, so a logo that is generous with
      its own whitespace lands visibly smaller than its neighbours at identical
      box sizes. This nudges the mark itself — not the box — to match. */
  scale?: number;
  /** Set on the sources shipped as light artwork burned onto an opaque dark
      background, where there is no alpha to knock out. Inverting them matches
      the polarity of the sources that are dark artwork on white, so all six sit
      on the same light card. See the note on card backgrounds below. */
  invert?: boolean;
}

const CREDENTIALS: Credential[] = [
  {
    id: "psf",
    logo: "/images/credentials/silogopsf.jpeg",
    organisation: "Πανελλήνιος Σύλλογος Φυσικοθεραπευτών Ελλάδος",
    detail: "Ενεργό μέλος",
    scale: 1.08,
  },
  {
    id: "omt",
    logo: "/images/credentials/homtd_hellas_ompt.jpg",
    organisation: "Πανελλήνιος Σύλλογος Χειροθεραπευτών Ελλάδος",
    detail: "MIDTERM-OMT, 2008",
    scale: 1.12,
  },
  {
    id: "efea",
    logo: "/images/credentials/efea_black_bg.png",
    organisation: "Ελληνική Εταιρεία Αλγολογίας (ΕΦΕΑ)",
    detail: "Εξειδικευμένος Βελονιστής, 2012",
    invert: true,
  },
  {
    id: "kta",
    logo: "/images/credentials/kinesio-kta-logo.jpg",
    organisation: "Παγκόσμια Ομοσπονδία KinesioTaping (KTA)",
    detail: "Μέλος",
  },
  {
    id: "ica",
    logo: "/images/credentials/ica.jpeg",
    organisation: "International Cutmen Association (ICA)",
    detail: "Εκπρόσωπος Ελλάδας από το 2017",
    invert: true,
  },
  {
    id: "wca",
    logo: "/images/credentials/wca.png",
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
 *
 * Cards are uniformly light on purpose. The sources arrive in both polarities —
 * some are dark artwork on white or on transparency, others are light artwork
 * burned onto an opaque black background with no alpha to knock out. Darkening
 * every card would leave the white-backed sources as bright rectangles floating
 * on dark, and no blend mode fixes both directions at once (multiply loses the
 * dark artwork, screen keeps the white). So the dark-backed sources are
 * inverted to the majority polarity instead — legitimate monochrome variants of
 * marks that carry no colour of their own.
 *
 * Every logo is fitted to one shared square box with object-contain, so the
 * space allocated per logo is identical; `scale` then corrects the two sources
 * whose baked-in margins would otherwise make them read as shrunken.
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
    <div
      ref={stripRef}
      className="w-full border-t border-ink-900/10 mt-2 pt-8 md:pt-10 pb-1 flex flex-col"
    >
      <p className="font-sans font-semibold text-xs uppercase tracking-wider text-ink-600 mb-5 md:mb-6">
        Πιστοποιήσεις & Φορείς
      </p>

      {/* One gap value drives both axes, so the two mobile rows sit as far
          apart as the columns do. */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
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
              className={`bg-white rounded-card border p-3 aspect-square cursor-pointer transition-all duration-300 ease-out focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary ${
                isActive
                  ? "border-primary/40 shadow-md -translate-y-0.5"
                  : "border-ink-900/10 shadow-sm"
              }`}
            >
              {/* The shared logo box: same square for all six, so object-contain
                  fits every mark into identical space regardless of its own
                  aspect ratio. */}
              <div className="relative w-full h-full">
                <Image
                  src={cred.logo}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 33vw, 140px"
                  style={cred.scale ? { transform: `scale(${cred.scale})` } : undefined}
                  className={`object-contain transition-all duration-300 ease-out ${
                    /* hue-rotate pairs with invert to flip lightness only:
                       inverting alone would show the ΕΦΕΑ tree as cyan once the
                       reveal restores colour, instead of its actual red. */
                    cred.invert ? "invert hue-rotate-180" : ""
                  } ${isActive ? "grayscale-0 opacity-100" : "grayscale opacity-85"}`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Shared reveal panel. Kept below the grid rather than as a per-logo
          popup so the text never gets clipped by the section edge on a 375px
          screen, where the outer logos sit hard against the gutter. min-h
          reserves the space, so revealing never shifts the layout. */}
      <div className="min-h-[3.5rem] sm:min-h-[3rem] mt-5 md:mt-6" aria-live="polite">
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

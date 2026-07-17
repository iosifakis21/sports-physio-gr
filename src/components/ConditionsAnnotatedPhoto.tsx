"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import conditionsData from "@/content/conditions.json";
import dotsData from "@/content/condition-dots.json";

interface ConditionGroup {
  id: string;
  areaTitle: string;
  items: string[];
}

interface ConditionDot {
  id: string;
  label: string;
  photo: string;
  conditionGroupId: string;
}

type DotGeometry = {
  /** Position as a percentage of the image container. */
  x: number;
  y: number;
  /** Which way the connector line + desktop card extend. */
  side: "left" | "right";
  /** Desktop card's vertical anchor, as a percentage of the stage height. */
  cardTop: number;
};

// Photo-relative placement for each dot, tuned to the running-athlete photo.
// Kept in the component (not the JSON) so condition-dots.json stays the exact
// { id, label, photo, conditionGroupId } shape the data contract specifies.
const GEOMETRY: Record<string, DotGeometry> = {
  "head-neck": { x: 38, y: 18, side: "left", cardTop: 20 },
  shoulder: { x: 28, y: 31, side: "left", cardTop: 46 },
  elbow: { x: 81, y: 37, side: "right", cardTop: 28 },
  hip: { x: 49, y: 50, side: "right", cardTop: 60 },
  knee: { x: 33, y: 57, side: "left", cardTop: 68 },
  "foot-ankle": { x: 35, y: 77, side: "left", cardTop: 82 },
};

const dots = dotsData as ConditionDot[];
const groups = conditionsData as ConditionGroup[];

export const ConditionsAnnotatedPhoto: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const headingId = useId();

  const openDot = openId ? dots.find((d) => d.id === openId) ?? null : null;
  const openGroup = openDot
    ? groups.find((g) => g.id === openDot.conditionGroupId) ?? null
    : null;
  const openGeom = openId ? GEOMETRY[openId] : undefined;

  const close = () => {
    const toFocus = openId ? dotRefs.current[openId] : null;
    setOpenId(null);
    // Return focus to the dot that opened the card.
    requestAnimationFrame(() => toFocus?.focus());
  };

  // When a card opens: move focus into it, trap Tab, close on Escape.
  useEffect(() => {
    if (!openId) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const focusables = () =>
      Array.from(
        cardEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        )
      );

    // Focus the first focusable (the close button) on open.
    requestAnimationFrame(() => focusables()[0]?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // close is stable enough for this effect; only re-run when the open dot changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <SectionHeading
        eyebrow="ΦΥΣΙΚΟΘΕΡΑΠΕΙΑ"
        heading="Πού Εντοπίζεται ο Πόνος;"
        subcopy="Επιλέξτε μία περιοχή στο σώμα για να δείτε πώς μπορούμε να σας βοηθήσουμε."
      />

      {/* Stage — dots and (desktop) cards position against this box. */}
      <div className="relative mx-auto w-full max-w-[360px] lg:max-w-[420px]">
        <Image
          src="/images/athletenobg.webp"
          alt="Αθλητής σε φάση τρεξίματος με επισημασμένες περιοχές πόνου"
          width={1068}
          height={1472}
          sizes="(max-width: 1024px) 360px, 420px"
          className="w-full h-auto select-none pointer-events-none"
        />

        {/* Interactive dot markers */}
        {dots.map((dot) => {
          const g = GEOMETRY[dot.id];
          if (!g) return null;
          const isOpen = openId === dot.id;
          return (
            <div
              key={dot.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${g.x}%`, top: `${g.y}%` }}
            >
              {/* Connector line toward the card (desktop only). */}
              <span
                aria-hidden="true"
                className={`hidden lg:block absolute top-1/2 h-px w-14 bg-primary/50 ${
                  g.side === "right" ? "left-full" : "right-full"
                }`}
              />
              <button
                ref={(el) => {
                  dotRefs.current[dot.id] = el;
                }}
                type="button"
                onClick={() => setOpenId(dot.id)}
                aria-label={`${dot.label} — δείτε σχετικές παθήσεις`}
                aria-expanded={isOpen}
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white shadow-lg ring-2 ring-white/80 cursor-pointer transition-transform hover:scale-110 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
              >
                {/* Soft continuous pulse — driven by motion (JS/WAAPI) so it
                    always plays regardless of the OS reduced-motion setting,
                    consistent with the rest of the site. */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="relative w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          );
        })}

        {/* Card + backdrop */}
        {openDot && openGroup && openGeom && (
          <>
            <div
              className="fixed inset-0 z-[55] bg-ink-900/50 backdrop-blur-[1px]"
              onClick={close}
              aria-hidden="true"
            />
            <div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              style={{ "--card-top": `${openGeom.cardTop}%` } as React.CSSProperties}
              className={`fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-h-[85vh] overflow-y-auto rounded-t-card bg-ink-900 text-white p-5 shadow-2xl
                lg:absolute lg:inset-x-auto lg:bottom-auto lg:mx-0 lg:w-[300px] lg:max-h-[78vh] lg:rounded-card lg:top-[var(--card-top)] lg:-translate-y-1/2 xl:w-[340px]
                ${openGeom.side === "right" ? "lg:left-full lg:ml-4 xl:ml-6" : "lg:right-full lg:mr-4 xl:mr-6"}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3
                  id={headingId}
                  className="font-display font-bold text-lg md:text-xl text-white leading-tight"
                >
                  {openDot.label}
                </h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Κλείσιμο"
                  className="flex-shrink-0 -mt-1 -mr-1 p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative w-full aspect-video rounded-card overflow-hidden mb-4 bg-white/5">
                <Image
                  src={openDot.photo}
                  alt={openDot.label}
                  fill
                  sizes="(max-width: 1024px) 90vw, 340px"
                  className="object-cover"
                />
              </div>

              <ul className="flex flex-col gap-3">
                {openGroup.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/25 text-primary-link flex items-center justify-center mt-0.5"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-3 h-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base font-sans text-slate-200 leading-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

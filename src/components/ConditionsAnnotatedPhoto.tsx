"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
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
  /** Small anchor point sitting directly ON the body part (% of container). */
  ax: number;
  ay: number;
  /** Large "+" button placed in the open space around the athlete (% of container). */
  bx: number;
  by: number;
  /**
   * Desktop card placement, as CSS length strings applied inside the stage.
   * Exactly one of left/right and one of top/bottom per dot, hand-tuned so the
   * card sits beside its "+" button without covering it and never escapes the
   * section vertically.
   */
  card: { left?: string; right?: string; top?: string; bottom?: string };
};

// Photo-relative placement for each anchor→dot pair, tuned to the
// running-athlete photo (athletenobg.webp). Kept in the component (not the
// JSON) so condition-dots.json stays the exact { id, label, photo,
// conditionGroupId } shape the data contract specifies.
// Nine independent pairs matching the reference layout: temple, raised-arm
// shoulder, raised-arm elbow/bicep, ribcage below the armpit, mid-forearm of
// the trailing arm, trailing wrist, hip/waistband, front knee, trailing ankle.
// Every line runs from its body anchor into open space — endpoints are placed
// so no line crosses the figure and no two big dots touch.
const GEOMETRY: Record<string, DotGeometry> = {
  "head-neck": { ax: 33, ay: 15, bx: 43, by: 6, card: { right: "calc(57% + 26px)", top: "0%" } },
  shoulder: { ax: 28, ay: 30, bx: 11, by: 36, card: { left: "calc(11% + 26px)", top: "5%" } },
  elbow: { ax: 13, ay: 22, bx: 5, by: 44, card: { left: "calc(5% + 26px)", top: "10%" } },
  "ribs-back": { ax: 29, ay: 38, bx: 21, by: 38, card: { left: "calc(21% + 26px)", top: "7%" } },
  forearm: { ax: 80, ay: 37, bx: 90, by: 26, card: { right: "calc(10% + 26px)", top: "3%" } },
  "hand-wrist": { ax: 86, ay: 38, bx: 96, by: 43, card: { right: "calc(4% + 26px)", top: "12%" } },
  hip: { ax: 62, ay: 50, bx: 72, by: 50, card: { right: "calc(28% + 26px)", top: "15%" } },
  knee: { ax: 33, ay: 58, bx: 47, by: 67, card: { right: "calc(53% + 26px)", bottom: "2%" } },
  "foot-ankle": { ax: 81, ay: 83, bx: 79, by: 93, card: { right: "calc(21% + 26px)", bottom: "0%" } },
};

// Intrinsic size of athletenobg.webp — the connector SVG uses it as its
// viewBox so percentage coordinates map exactly onto the photo.
const PHOTO_W = 1068;
const PHOTO_H = 1472;

// Straight connector from the body anchor to the "+" button, matching the
// reference layout's simple angled callout lines.
const connectorPath = (g: DotGeometry) => {
  const ax = (g.ax / 100) * PHOTO_W;
  const ay = (g.ay / 100) * PHOTO_H;
  const bx = (g.bx / 100) * PHOTO_W;
  const by = (g.by / 100) * PHOTO_H;
  return `M ${ax} ${ay} L ${bx} ${by}`;
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
    <div className="w-full flex flex-col items-center lg:items-end gap-4">
      {/* Stage — dots and (desktop) cards position against this box. */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px]">
        {/* Decorative brand-blue blob behind the athlete, for visual depth. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-auto text-primary opacity-[0.07] pointer-events-none"
        >
          <path
            fill="currentColor"
            d="M48.2,-64.8C61.4,-55.9,70.4,-40.5,75.1,-24.1C79.8,-7.6,80.2,9.9,74.2,24.8C68.2,39.7,55.8,52,41.5,61.3C27.2,70.6,10.9,76.9,-5.4,74.1C-21.8,71.3,-38.2,59.3,-51.5,45.6C-64.8,31.9,-75,16,-76.5,-0.9C-78,-17.7,-70.8,-35.4,-58.4,-44.9C-46,-54.4,-28.5,-55.7,-11.9,-58.5C4.7,-61.3,35,-73.7,48.2,-64.8Z"
            transform="translate(100 100)"
          />
        </svg>

        <Image
          src="/images/athletenobg copy.png"
          alt="Αθλητής σε φάση τρεξίματος με επισημασμένες περιοχές πόνου"
          width={1068}
          height={1472}
          sizes="(max-width: 1024px) 400px, 440px"
          className="relative w-full h-auto select-none pointer-events-none"
        />

        {/* Dogleg connector lines: anchor → 45° diagonal → horizontal → button.
            One SVG over the photo; its viewBox matches the photo's intrinsic
            size so percentage coordinates land exactly. Soft looping opacity
            pulse keeps the technical lines feeling alive. */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${PHOTO_W} ${PHOTO_H}`}
          preserveAspectRatio="none"
        >
          {dots.map((dot) => {
            const g = GEOMETRY[dot.id];
            if (!g) return null;
            return (
              <motion.path
                key={dot.id}
                d={connectorPath(g)}
                fill="none"
                className="stroke-primary"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}
        </svg>

        {/* Small anchor points sitting directly on the body part */}
        {dots.map((dot) => {
          const g = GEOMETRY[dot.id];
          if (!g) return null;
          return (
            <span
              key={dot.id}
              aria-hidden="true"
              className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-white/80 pointer-events-none"
              style={{ left: `${g.ax}%`, top: `${g.ay}%` }}
            />
          );
        })}

        {/* Interactive "+" buttons in the open space around the athlete */}
        {dots.map((dot) => {
          const g = GEOMETRY[dot.id];
          if (!g) return null;
          const isOpen = openId === dot.id;
          return (
            <div
              key={dot.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${g.bx}%`, top: `${g.by}%` }}
            >
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
            {/* Backdrop dims the page but stays BELOW the fixed Header (z-50),
                so the nav remains visible and usable while a card is open.
                Scrolling is never locked. */}
            <div
              className="fixed inset-0 z-30 bg-ink-900/45"
              onClick={close}
              aria-hidden="true"
            />
            {/* Card: centered modal on mobile; on desktop an absolutely
                positioned floating panel inside the photo stage, placed next
                to the dot that opened it. z-40 keeps it above the backdrop,
                photo and dots but below the Header. Long content scrolls
                inside the card. */}
            <div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              style={
                {
                  "--card-left": openGeom.card.left ?? "auto",
                  "--card-right": openGeom.card.right ?? "auto",
                  "--card-top": openGeom.card.top ?? "auto",
                  "--card-bottom": openGeom.card.bottom ?? "auto",
                } as React.CSSProperties
              }
              className="fixed z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,380px)] max-h-[76vh] overflow-y-auto rounded-card bg-ink-900 text-white p-5 shadow-2xl
                lg:absolute lg:translate-x-0 lg:translate-y-0 lg:left-[var(--card-left)] lg:right-[var(--card-right)] lg:top-[var(--card-top)] lg:bottom-[var(--card-bottom)] lg:w-[300px] xl:w-[340px] lg:max-h-[min(540px,80vh)]"
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

      {/* Small caption, bottom-right of the photo. */}
      <div className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] text-right">
        <p className="font-semibold text-ink-900">Πού πονάει;</p>
        <p className="text-sm font-light text-ink-600">
          Πατήστε σε μια κουκκίδα για να μάθετε περισσότερα.
        </p>
      </div>
    </div>
  );
};

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dotsData from "@/content/condition-dots.json";
import descriptionsData from "@/content/condition-descriptions.json";
import { Button } from "@/components/Button";

interface ConditionDot {
  id: string;
  label: string;
  photo: string;
  conditionGroupId: string;
}

interface ConditionDescription {
  id: string;
  description: string;
}

type DotGeometry = {
  bx: number;
  by: number;
  dx: number;
  dy: number;
  align: "left" | "right";
  verticalClass: string;
};

const GEOMETRY: Record<string, DotGeometry> = {
  "head-neck": { bx: 51.8, by: 20.1, dx: 1, dy: 0, align: "right", verticalClass: "lg:top-0" },
  shoulder: { bx: 25.4, by: 20.9, dx: -0.638, dy: -0.77, align: "left", verticalClass: "lg:top-0" },
  elbow: { bx: 6.6, by: 29.8, dx: 0, dy: 1, align: "left", verticalClass: "lg:top-0" },
  "ribs-back": { bx: 66.6, by: 41.2, dx: 1, dy: 0, align: "right", verticalClass: "lg:-top-8" },
  "hand-wrist": { bx: 92.0, by: 34.3, dx: 0, dy: -1, align: "right", verticalClass: "lg:top-0" },
  hip: { bx: 69.5, by: 51.8, dx: 0.744, dy: 0.669, align: "right", verticalClass: "lg:-top-16" },
  knee: { bx: 17.3, by: 51.1, dx: -1, dy: 0, align: "left", verticalClass: "lg:-top-16" },
  "muscle-strain": { bx: 75.8, by: 65.8, dx: 1, dy: 0, align: "right", verticalClass: "lg:bottom-0" },
  "foot-ankle": { bx: 88.7, by: 78.7, dx: 0, dy: -1, align: "right", verticalClass: "lg:bottom-0" },
};

const BUTTON_OFFSET = 16;

const dots = dotsData as ConditionDot[];
const descriptions = descriptionsData as ConditionDescription[];

export const ConditionsAnnotatedPhoto: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveGroupId(id), 200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActiveGroupId(null), 250);
  };

  useEffect(() => {
    if (!activeGroupId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveGroupId(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeGroupId]);

  return (
    <div className="w-full flex flex-col items-center lg:items-end gap-4">
      {/* Stage — dots and cards position against this box */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px]">
        {/* Decorative background blob */}
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

        {/* Interactive dots + attached card popups */}
        {dots.map((dot, i) => {
          const g = GEOMETRY[dot.id];
          if (!g) return null;
          const isActive = activeGroupId === dot.id;
          const desc = descriptions.find((d) => d.id === dot.id);

          return (
            <div
              key={dot.id}
              className={`absolute ${isActive ? "z-50" : "z-10"}`}
              style={{
                left: `calc(${g.bx}% + ${(g.dx * BUTTON_OFFSET).toFixed(1)}px - 14px)`,
                top: `calc(${g.by}% + ${(g.dy * BUTTON_OFFSET).toFixed(1)}px - 14px)`,
              }}
              onMouseEnter={() => handleMouseEnter(dot.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dot Button */}
              <button
                type="button"
                onClick={() => {
                  if (timerRef.current) clearTimeout(timerRef.current);
                  setActiveGroupId(isActive ? null : dot.id);
                }}
                aria-label={`${dot.label} — δείτε σχετικές πληροφορίες`}
                aria-expanded={isActive}
                className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white shadow-lg ring-2 ring-white/80 cursor-pointer transition-transform hover:scale-110 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary/40 animate-dot-pulse"
                  style={{ animationDelay: `${i * 0.15}s`, willChange: "transform, opacity" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="relative w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>

              {/* Popup Card when active */}
              {isActive && desc && (
                <>
                  {/* Backdrop for mobile */}
                  <div
                    className="lg:hidden fixed inset-0 z-30 bg-ink-900/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGroupId(null);
                    }}
                    aria-hidden="true"
                  />

                  {/* Card Container */}
                  <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={dot.label}
                    className={`fixed lg:absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 w-[min(90vw,340px)] lg:w-[300px] xl:w-[320px] rounded-card bg-ink-900 text-white p-5 shadow-2xl overflow-hidden pointer-events-auto ${g.verticalClass} ${
                      g.align === "left"
                        ? "lg:left-[calc(100%+12px)] before:content-[''] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-4"
                        : "lg:right-[calc(100%+12px)] before:content-[''] before:absolute before:-right-4 before:top-0 before:bottom-0 before:w-4"
                    }`}
                  >
                    {/* 1. Condition Group Image */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-white/5">
                      <img
                        src={dot.photo}
                        alt={dot.label}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 2. Area Title */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg md:text-xl text-white leading-tight">
                        {dot.label}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveGroupId(null);
                        }}
                        aria-label="Κλείσιμο"
                        className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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

                    {/* 3. Symptom-based paragraph */}
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-5">
                      {desc.description}
                    </p>

                    {/* 4. REMOVE bulleted list — omitted */}

                    {/* 5. "Κλείστε Ραντεβού" Button */}
                    <Button
                      href="#kleiste-rantevou"
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        setActiveGroupId(null);
                        document.getElementById("kleiste-rantevou")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Κλείστε Ραντεβού
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Caption at bottom */}
      <div className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] text-right">
        <p className="font-semibold text-ink-900">Πού πονάει;</p>
        <p className="text-sm font-light text-ink-600">
          Περάστε ή πατήστε σε μια κουκκίδα για να μάθετε περισσότερα.
        </p>
      </div>
    </div>
  );
};

"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { serviceMenuItems } from "@/content/service-menu";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ArrowIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * Το dropdown «Υπηρεσίες» του desktop header: λίστα με τις 6 υπηρεσίες σε δύο
 * στήλες και ένα σταθερό πάνελ εικόνας δεξιά, που αλλάζει με crossfade καθώς ο
 * χρήστης περνά (με ποντίκι ή πληκτρολόγιο) πάνω από κάθε υπηρεσία.
 *
 * Ανοίγει με hover/focus, κλείνει με mouse leave, click σε σύνδεσμο, click
 * εκτός, ή Escape.
 */
export const ServicesMegaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Το Escape επιστρέφει το focus στο trigger, που βρίσκεται μέσα στο
  // container: χωρίς αυτή τη σημαία το onFocus θα ξανάνοιγε αμέσως το πάνελ
  // που μόλις έκλεισε ο χρήστης.
  const suppressFocusOpen = useRef(false);
  const panelId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  const active = serviceMenuItems[activeIndex] ?? serviceMenuItems[0];

  const close = useCallback(() => {
    setIsOpen(false);
    // Η εικόνα επιστρέφει στην πρώτη υπηρεσία, ώστε το επόμενο άνοιγμα να
    // ξεκινά πάντα από την ίδια «ουδέτερη» κατάσταση.
    setActiveIndex(0);
  }, []);

  // Click εκτός του dropdown, και Escape από οπουδήποτε.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        suppressFocusOpen.current = true;
        triggerRef.current?.focus();
        suppressFocusOpen.current = false;
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  // Το focus που φεύγει τελείως από το menu (Tab μετά το τελευταίο στοιχείο)
  // το κλείνει, χωρίς να κλέβει το focus από το επόμενο link.
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
      setActiveIndex(0);
    }
  };

  const fade = prefersReducedMotion ? 0 : 0.35;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={close}
      onFocus={() => {
        if (!suppressFocusOpen.current) setIsOpen(true);
      }}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={`flex items-center gap-1 font-sans font-medium text-sm transition-colors duration-200 focus:outline focus:outline-2 focus:outline-primary rounded p-1 cursor-pointer ${
          isOpen ? "text-primary-link" : "text-ink-600 hover:text-primary-link"
        }`}
      >
        Υπηρεσίες
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
            // Το padding-top γεφυρώνει το κενό ανάμεσα στο header και το πάνελ,
            // ώστε η μετακίνηση του ποντικιού προς τα κάτω να μην το κλείνει.
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
          >
            <div className="w-[640px] max-w-[90vw] rounded-card bg-surface shadow-2xl border border-ink-900/10 p-5 flex gap-5">
              {/* Λίστα υπηρεσιών, δύο στήλες */}
              <ul className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1 content-start">
                {serviceMenuItems.map((item, index) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      onClick={close}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`block rounded-md px-3 py-2 font-sans text-sm leading-snug transition-colors duration-200 focus:outline focus:outline-2 focus:outline-primary ${
                        index === activeIndex
                          ? "bg-primary text-white font-semibold"
                          : "text-ink-900 hover:text-primary-link"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Σταθερό πάνελ εικόνας — δείχνει την υπηρεσία που «κοιτά» ο χρήστης */}
              <Link
                href={active.href}
                onClick={close}
                aria-label={`${active.title} — μάθετε περισσότερα`}
                className="relative block w-[240px] shrink-0 aspect-[4/3] overflow-hidden rounded-card bg-ink-900 group focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
              >
                <AnimatePresence initial={false}>
                  <motion.span
                    key={active.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: fade, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.photo}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </motion.span>
                </AnimatePresence>

                <span
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between gap-2">
                  <span className="font-display font-bold uppercase text-white text-xs leading-tight tracking-tight">
                    {active.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-white/15 backdrop-blur-sm text-white transition-colors duration-200 group-hover:bg-white/25"
                  >
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { servicePages, servicePageHref } from "@/content/service-pages";

/** The flat list the menu renders, derived once from the service page content. */
const services = servicePages.map((page) => ({
  slug: page.slug,
  label: page.hero.title,
  photo: page.hero.photo,
}));

interface ServicesMegaMenuProps {
  /** Fallback href for the trigger itself (the homepage services section). */
  href: string;
  label: string;
  /** Shared with the rest of the desktop nav links. */
  triggerClassName: string;
}

/**
 * Desktop "Υπηρεσίες" dropdown: a two-pane panel with the six service links on
 * the left and a preview image on the right that crossfades to whichever
 * service is hovered or focused.
 *
 * Opens on hover *and* on keyboard focus; closes on mouse leave, on Escape, on
 * a click outside, and whenever focus moves out of the panel. The panel is a
 * DOM child of the trigger wrapper (with a padding "bridge" instead of a
 * margin), so travelling from the nav item down into the panel never crosses
 * an unhovered gap.
 */
export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({
  href,
  label,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  /** Set while Escape hands focus back to the trigger, so the focus handler
      does not immediately reopen the panel the user just dismissed. */
  const suppressFocusOpen = useRef(false);
  const panelId = useId();

  const active = services.find((s) => s.slug === activeSlug) ?? services[0];

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveSlug(services[0].slug);
  }, []);

  // Escape closes and returns focus to the trigger; a click anywhere outside
  // the menu closes it without stealing focus.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        suppressFocusOpen.current = true;
        triggerRef.current?.focus();
        suppressFocusOpen.current = false;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, close]);

  // Tabbing past the last link in the panel should close it, but focus moving
  // *within* the menu must not.
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && wrapperRef.current?.contains(next)) return;
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={close}
      onFocus={() => {
        if (!suppressFocusOpen.current) setIsOpen(true);
      }}
      onBlur={handleBlur}
    >
      <a
        ref={triggerRef}
        href={href}
        className={`${triggerClassName} inline-flex items-center gap-1 ${
          isOpen ? "text-primary-link" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            // Left-aligned to the trigger rather than centred on it: "Υπηρεσίες"
            // is the leftmost nav item, so a centred 620px panel would hang off
            // the left edge of the viewport. `pt-7` is the hover bridge between
            // the nav item and the panel.
            className="absolute top-full left-0 pt-7 z-50"
            initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-[620px] rounded-2xl border border-ink-900/10 bg-surface shadow-2xl p-3 flex gap-3">
              {/* Left: the service links */}
              <ul className="flex-1 flex flex-col" aria-label="Υπηρεσίες">
                {services.map((service) => {
                  const isActive = service.slug === activeSlug;
                  return (
                    <li key={service.slug}>
                      <Link
                        href={servicePageHref(service.slug)}
                        onMouseEnter={() => setActiveSlug(service.slug)}
                        onFocus={() => setActiveSlug(service.slug)}
                        onClick={close}
                        className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-colors duration-200 focus:outline focus:outline-2 focus:outline-primary ${
                          isActive ? "bg-primary/5 text-primary" : "text-ink-600 hover:text-primary"
                        }`}
                      >
                        <span>{service.label}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                          }`}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Right: the preview image for the hovered/focused service */}
              <Link
                href={servicePageHref(active.slug)}
                onClick={close}
                tabIndex={-1}
                aria-hidden="true"
                className="relative w-[260px] shrink-0 overflow-hidden rounded-xl bg-ink-900/5"
              >
                <AnimatePresence initial={false}>
                  <motion.span
                    key={active.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={active.photo}
                      alt={active.label}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  </motion.span>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink-900/80 to-transparent p-4 pt-10">
                  <span className="font-display font-bold text-sm text-white">{active.label}</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

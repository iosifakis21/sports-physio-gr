"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./Button";

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    // Check if we are on a mobile device/viewport
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 768;
      if (!isMobileSize) {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    // Set up intersection observer to hide CTA when booking section is in view
    const bookingSection = document.getElementById("kleiste-rantevou");
    let observer: IntersectionObserver | null = null;

    if (bookingSection) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // Hide sticky CTA if booking section is visible on screen
          setIsVisible(!entry.isIntersecting && window.innerWidth < 768);
        },
        { threshold: 0.1 } // triggers when 10% of the booking section is visible
      );
      observer.observe(bookingSection);
    }

    // Monitor input focus to prevent blocking/overlap issues on mobile keyboards
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA")) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Determine visibility condition: must be visible, viewport is mobile, and no input is focused
  const shouldRender = isVisible && !isInputFocused;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-ink-900/10 p-3 flex items-center justify-between gap-3 md:hidden shadow-lg transition-transform duration-300 ${
        shouldRender ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!shouldRender}
    >
      {/* Primary CTA button linking to booking */}
      <Button
        variant="primary"
        label="Κλείστε Ραντεβού"
        href="#kleiste-rantevou"
        className="flex-grow text-center text-sm font-semibold h-[44px]"
      />

      {/* Call button icon */}
      <a
        href="tel:+302101234567"
        className="w-[44px] h-[44px] rounded-btn bg-surface border border-primary text-primary flex items-center justify-center flex-shrink-0 hover:bg-surface-alt transition-colors focus:outline focus:outline-2 focus:outline-primary select-none shadow-sm"
        aria-label="Τηλεφωνική κλήση με το φυσικοθεραπευτήριο"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.625c0-1.25.96-2.222 2.22-2.25h1.222c.578 0 1.07.393 1.189.957l.8 3.79c.1.48-.13.974-.556 1.205L5.75 11.23c1.4 2.76 3.63 4.97 6.4 6.36l.9-1.373c.23-.356.69-.536 1.12-.416l3.85.81c.56.12.95.613.95 1.189v1.223c0 1.25-.97 2.21-2.22 2.22h-1c-8.28 0-15-6.716-15-15v-1.023z"
          />
        </svg>
      </a>
    </div>
  );
};

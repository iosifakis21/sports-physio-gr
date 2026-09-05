"use client";

import React, { useEffect, useRef, useState } from "react";

/** The subset of animatable properties the call sites actually use. */
export interface AnimationState {
  opacity?: number;
  translateX?: number;
  translateY?: number;
  filter?: string;
}

interface AnimatedContainerProps {
  /** Stagger delay (in seconds) before this container animates in. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
  /** Overrides the default hidden state. Defaults match the original Footer entrance. */
  initial?: AnimationState;
  /** Overrides the default revealed (in-view) state. Defaults match the original Footer entrance. */
  whileInView?: AnimationState;
  /** Overrides the default 0.8s entrance duration. */
  duration?: number;
}

const DEFAULT_INITIAL: AnimationState = { opacity: 0, translateY: -8, filter: "blur(4px)" };
const DEFAULT_WHILE_IN_VIEW: AnimationState = { opacity: 1, translateY: 0, filter: "blur(0px)" };

/** `translate` is an independent property, so it never fights a `transform`
    utility on the same element (the previous motion version relied on the
    same trick). */
const toStyle = (state: AnimationState): React.CSSProperties => ({
  opacity: state.opacity,
  translate:
    state.translateX !== undefined || state.translateY !== undefined
      ? `${state.translateX ?? 0}px ${state.translateY ?? 0}px`
      : undefined,
  filter: state.filter,
});

/**
 * Scroll-triggered entrance (fade + optional translate/blur, configurable via
 * `initial`/`whileInView`). Plays once when scrolled into view.
 *
 * Implemented with an IntersectionObserver and a CSS transition rather than
 * motion/react: this component wraps content in nearly every section, so it
 * was single-handedly pulling the animation library into the initial
 * JavaScript for every page. `prefers-reduced-motion` is handled globally in
 * globals.css, which collapses the transition to its end state.
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  delay = 0,
  className,
  children,
  initial = DEFAULT_INITIAL,
  whileInView = DEFAULT_WHILE_IN_VIEW,
  duration = 0.8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    // No IntersectionObserver (very old browsers): reveal on the next frame
    // rather than leaving the content stuck in its hidden state.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        setRevealed(true);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, translate, filter",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        transitionDelay: `${delay}s`,
        // Το `will-change` ζητά από τον browser να κρατήσει το στοιχείο σε δικό
        // του compositor layer. Έμενε μόνιμα ενεργό: 26 μόνιμα layers στην
        // αρχική, για κινήσεις που παίζουν ΜΙΑ φορά. Το αφαιρούμε μόλις γίνει
        // η αποκάλυψη, ώστε ο browser να ελευθερώσει τη μνήμη.
        willChange: revealed ? undefined : "opacity, translate, filter",
        ...toStyle(revealed ? whileInView : initial),
      }}
    >
      {children}
    </div>
  );
};

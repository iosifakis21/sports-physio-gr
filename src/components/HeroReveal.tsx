import React from "react";

interface HeroRevealProps {
  /** Stagger delay (in seconds) before this element fades up. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * On-mount fade-up entrance for above-the-fold Hero content (NOT scroll-
 * triggered — it animates on page load).
 *
 * Deliberately a server component driven by a CSS keyframe rather than
 * motion/react: the Hero is the LCP area, and a JS animation library there
 * means the first paint waits on hydration. `prefers-reduced-motion` is
 * honoured globally in globals.css, which collapses the animation to its end
 * state.
 */
export const HeroReveal: React.FC<HeroRevealProps> = ({
  delay = 0,
  className,
  children,
}) => {
  return (
    <div
      className={`animate-hero-reveal${className ? ` ${className}` : ""}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
};

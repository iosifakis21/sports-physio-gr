"use client";

import React from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroRevealProps {
  /** Stagger delay (in seconds) before this element fades up. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * On-mount fade-up entrance for above-the-fold Hero content (NOT scroll-
 * triggered — it animates on page load). If the user prefers reduced motion
 * the element renders immediately visible with no transition.
 */
export const HeroReveal: React.FC<HeroRevealProps> = ({
  delay = 0,
  className,
  children,
}) => {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

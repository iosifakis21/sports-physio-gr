"use client";

import React from "react";
import { motion } from "motion/react";

interface HeroRevealProps {
  /** Stagger delay (in seconds) before this element fades up. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * On-mount fade-up entrance for above-the-fold Hero content (NOT scroll-
 * triggered — it animates on page load).
 */
export const HeroReveal: React.FC<HeroRevealProps> = ({
  delay = 0,
  className,
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

"use client";

import React from "react";
import { motion, type TargetAndTransition, type VariantLabels } from "motion/react";

interface AnimatedContainerProps {
  /** Stagger delay (in seconds) before this container animates in. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
  /** Overrides the default hidden state. Defaults match the original Footer entrance. */
  initial?: TargetAndTransition | VariantLabels | boolean;
  /** Overrides the default revealed (in-view) state. Defaults match the original Footer entrance. */
  whileInView?: TargetAndTransition | VariantLabels;
  /** Overrides the default 0.8s entrance duration. */
  duration?: number;
}

const DEFAULT_INITIAL = { opacity: 0, translateY: -8, filter: "blur(4px)" };
const DEFAULT_WHILE_IN_VIEW = { opacity: 1, translateY: 0, filter: "blur(0px)" };

/**
 * Scroll-triggered entrance (fade + optional translate/blur, configurable via
 * `initial`/`whileInView`). Plays once when scrolled into view.
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  delay = 0,
  className,
  children,
  initial = DEFAULT_INITIAL,
  whileInView = DEFAULT_WHILE_IN_VIEW,
  duration = 0.8,
}) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

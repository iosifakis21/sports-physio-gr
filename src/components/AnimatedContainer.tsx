"use client";

import React, { useEffect, useState } from "react";
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
 *
 * Accessibility: if the user prefers reduced motion the animation is skipped
 * entirely — children render statically and fully visible, never as a hidden
 * initial state. We detect the preference with matchMedia directly and only
 * upgrade to the animated element after mount, which also avoids any
 * hidden-until-hydrated flash of content.
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  delay = 0,
  className,
  children,
  initial = DEFAULT_INITIAL,
  whileInView = DEFAULT_WHILE_IN_VIEW,
  duration = 0.8,
}) => {
  // Assume reduced motion until we've checked on the client. This guarantees
  // the server / first paint renders visible, static content and never a
  // hidden initial state that could get stuck.
  const [reduceMotion, setReduceMotion] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    setMounted(true);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

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

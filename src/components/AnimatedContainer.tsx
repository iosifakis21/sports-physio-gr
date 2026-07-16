"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface AnimatedContainerProps {
  /** Stagger delay (in seconds) before this container animates in. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Subtle scroll-triggered fade-up entrance (blur + fade + translateY).
 * Plays once when scrolled into view.
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
      initial={{ opacity: 0, translateY: -8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

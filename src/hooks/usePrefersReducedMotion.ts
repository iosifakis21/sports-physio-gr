"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting via matchMedia.
 *
 * Defaults to `false` (motion allowed) until mounted so that entrance
 * animations render their hidden initial state on the server and play once on
 * hydration. Reduced-motion users flip to `true` on mount, at which point
 * callers should render content immediately with no transition.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting via matchMedia.
 *
 * Defaults to `false` (motion allowed) on the server so that entrance
 * animations render their hidden initial state during SSR and play once on
 * hydration. Reduced-motion users flip to `true` immediately on the client, at
 * which point callers should render content with no transition.
 *
 * Υλοποιείται με `useSyncExternalStore` και όχι με `useEffect` + `setState`:
 * το matchMedia ΕΙΝΑΙ εξωτερικό store, και η παλιά μορφή (ανάγνωση του
 * `mq.matches` μέσα στο σώμα του effect) προκαλούσε έναν επιπλέον κύκλο
 * render σε κάθε mount — το `react-hooks/set-state-in-effect` το ανέφερε ως
 * σφάλμα. Εδώ η τιμή διαβάζεται στο πρώτο render, χωρίς δεύτερο πέρασμα.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches;

/** Στον server δεν υπάρχει matchMedia — η κίνηση θεωρείται επιτρεπτή. */
const getServerSnapshot = (): boolean => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

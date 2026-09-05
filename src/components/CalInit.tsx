"use client";

import { useEffect } from "react";
import { initCal } from "@/lib/cal";

/**
 * Φορτώνει το script του Cal.com — αλλά ΟΧΙ κατά την αρχική φόρτωση.
 *
 * ΓΙΑΤΙ ΑΛΛΑΞΕ: πριν καλούσε το `useCalInit()` κατευθείαν στο mount, από το
 * root layout. Δηλαδή ΚΑΘΕ σελίδα του site κατέβαζε και εκτελούσε script
 * τρίτου κατά την ενυδάτωση, ανταγωνιζόμενο το κύριο νήμα ακριβώς τη στιγμή
 * που ζωγραφίζεται το στοιχείο LCP. Ήταν ο μεγαλύτερος τρίτος στη σελίδα.
 *
 * ΤΩΡΑ: φορτώνει στην πρώτη ένδειξη ότι ο επισκέπτης είναι εδώ (άγγιγμα,
 * κλικ, πλήκτρο, κύλιση) — ή, αν δεν συμβεί τίποτα από αυτά, μόλις ο browser
 * μείνει αδρανής. Στην πράξη το script είναι έτοιμο πολύ πριν προλάβει
 * κανείς να πατήσει «Κλείστε Ραντεβού», αλλά δεν βρίσκεται πια στην κρίσιμη
 * διαδρομή της πρώτης εμφάνισης.
 *
 * Δίχτυ ασφαλείας: ακόμη κι αν το script δεν έχει φορτώσει τη στιγμή του
 * κλικ, το `Button` με `calPopup` το ανιχνεύει και πλοηγεί στο ενσωματωμένο
 * ημερολόγιο (`#kleiste-rantevou`) — η κράτηση δεν χάνεται ποτέ.
 */
export const CalInit: React.FC = () => {
  useEffect(() => {
    let loaded = false;

    // Τα events είναι passive/once: δεν καθυστερούν το scroll ούτε μένουν
    // κολλημένα μετά την πρώτη φόρτωση.
    const triggers = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const cleanup = () => {
      triggers.forEach((t) => window.removeEventListener(t, load));
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };

    function load() {
      if (loaded) return;
      loaded = true;
      cleanup();
      void initCal();
    }

    triggers.forEach((t) =>
      window.addEventListener(t, load, { once: true, passive: true })
    );

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(load, { timeout: 4000 });
    } else {
      // Safari: δεν υποστηρίζει requestIdleCallback.
      timeoutHandle = window.setTimeout(load, 2500);
    }

    return cleanup;
  }, []);

  return null;
};

"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/Button";

/**
 * Όριο σφάλματος για ολόκληρο το app.
 *
 * Τα error boundaries ΠΡΕΠΕΙ να είναι Client Components. Το αρχείο αυτό τυλίγει
 * τα `page.tsx`, `not-found.tsx` και τα ένθετα layouts — ΟΧΙ όμως το root
 * layout, οπότε το header και το footer παραμένουν στη θέση τους όταν
 * εμφανιστεί.
 *
 * ΣΗΜΕΙΩΣΗ ΓΙΑ NEXT 16: το prop λέγεται πλέον `unstable_retry`, όχι `reset`
 * όπως στις προηγούμενες εκδόσεις.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Μέχρι να εγκατασταθεί error tracking (π.χ. Sentry), αυτό είναι το μόνο
    // ίχνος που μένει. Όταν μπει, η κλήση του πάει εδώ.
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-[56px] md:py-[96px] flex flex-col items-center gap-8 md:gap-10">

      <div className="flex flex-col items-center text-center gap-3 max-w-2xl">
        <span className="font-mono font-bold text-sm tracking-[0.2em] text-primary">
          ΣΦΑΛΜΑ
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 font-display tracking-tight text-balance">
          Κάτι πήγε στραβά
        </h1>
        <p className="mt-1 text-base md:text-lg text-ink-600 font-sans leading-relaxed">
          Παρουσιάστηκε ένα απρόσμενο πρόβλημα κατά τη φόρτωση της σελίδας.
          Δοκιμάστε ξανά — αν συνεχίσει, κλείστε το ραντεβού σας τηλεφωνικά και
          θα το τακτοποιήσουμε άμεσα.
        </p>
      </div>

      {/* Όπως και στο not-found: χωρίς αυτό η σελίδα πηγαίνει από το h1
          κατευθείαν στα h3 του υποσελίδου. Μόνο για αναγνώστες οθόνης. */}
      <h2 className="sr-only">Τι μπορείτε να κάνετε</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          variant="primary"
          label="Δοκιμάστε ξανά"
          onClick={() => unstable_retry()}
        />
        <Button href="/" variant="secondary" label="Επιστροφή στην αρχική" />
      </div>

      <p className="font-sans text-sm text-ink-600 text-center">
        Τηλέφωνο:{" "}
        <a
          href="tel:+302128488984"
          className="text-primary font-semibold hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
        >
          210 28 48 984
        </a>
      </p>

      {/* Το digest είναι το μόνο σημείο σύνδεσης με τα server-side logs: τα
          μηνύματα σφαλμάτων από Server Components δεν φτάνουν στον browser. */}
      {error.digest && (
        <p className="font-mono text-xs text-ink-600/70">
          Κωδικός σφάλματος: {error.digest}
        </p>
      )}

    </div>
  );
}

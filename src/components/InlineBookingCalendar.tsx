"use client";

import React, { useEffect, useRef, useState } from "react";
import Cal from "@calcom/embed-react";
import { CheckItem } from "@/components/CheckItem";
import { CAL_LINK, CAL_NAMESPACE, initCal } from "@/lib/cal";

/**
 * The inline Cal.com booking calendar, with its headline, trust row and phone
 * fallback. Rendered once per page — on the homepage and at the foot of every
 * service and condition page — and always carries the `kleiste-rantevou`
 * anchor, so a same-page CTA falling back to `#kleiste-rantevou` scrolls to
 * that page's own calendar rather than the homepage's.
 */
export const InlineBookingCalendar: React.FC = () => {
  /**
   * Το ημερολόγιο μπαίνει στο DOM μόνο όταν πλησιάσει το viewport.
   *
   * Βρίσκεται στο τέλος της σελίδας, πολύ κάτω από το fold, αλλά το
   * `<Cal>` κατέβαζε το script του Cal.com και ανέβαζε iframe αμέσως στο
   * mount — δηλαδή σε ΚΑΘΕ φόρτωση της αρχικής, ακόμη κι αν ο επισκέπτης
   * δεν έφτανε ποτέ ως εδώ. Ήταν από τα βαρύτερα στοιχεία της σελίδας και
   * έτρεχε ενώ ζωγραφιζόταν ακόμη το πάνω μέρος.
   *
   * Το `rootMargin` των 800px το ξεκινά αρκετά νωρίς ώστε, όταν το
   * ημερολόγιο φτάσει στην οθόνη, να είναι ήδη εκεί.
   */
  const holderRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el || showCalendar) return;

    // Χωρίς IntersectionObserver (πολύ παλιοί browsers): εμφάνισέ το στο
    // επόμενο frame, αντί να μείνει ο επισκέπτης χωρίς ημερολόγιο. Το
    // requestAnimationFrame — και όχι σκέτο setState εδώ — αποφεύγει τον
    // επιπλέον κύκλο render που εντοπίζει το `react-hooks/set-state-in-effect`.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShowCalendar(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          void initCal();
          setShowCalendar(true);
        }
      },
      { rootMargin: "800px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showCalendar]);

  return (
    <section id="kleiste-rantevou" className="py-[56px] md:py-[96px] bg-primary text-white scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-12 items-center">

        {/* Header content */}
        <div className="text-center flex flex-col gap-4 max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Ξεκινήστε την αποκατάστασή σας σήμερα
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed">
            Επιλέξτε ημέρα και ώρα από το ημερολόγιο και κλείστε το ραντεβού σας άμεσα, χωρίς να απαιτείται δημιουργία λογαριασμού.
          </p>

          {/* Compact Trust checkmarks row with white-contrast style overrides */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 mt-2 text-slate-200 text-xs sm:text-sm font-sans [&_span]:!text-slate-100 font-medium">
            <CheckItem text="10+ χρόνια εμπειρίας" />
            <CheckItem text="Συμβεβλημένος με ΕΟΠΥΥ" />
            <CheckItem text="Δεκτές όλες οι ασφαλιστικές" />
            <CheckItem text="Κράτηση σε < 1 λεπτό" />
          </div>
        </div>

        {/* Cal.com inline booking calendar. The min-height sits on the embed
            itself so the card reserves space before Cal.com's script mounts the
            iframe, then shrinks back to the widget's own height once it has —
            a fixed height on the card would leave dead white space below it. */}
        {/* Το `min-h-[620px]` κρατά τον χώρο ΚΑΙ πριν μπει το ημερολόγιο,
            ώστε η καθυστερημένη προσάρτηση να μη μετακινεί τίποτα (CLS 0). */}
        <div
          ref={holderRef}
          className="w-full max-w-[1000px] min-h-[620px] bg-surface rounded-card px-2 pt-2 pb-1 sm:px-4 sm:pt-4 sm:pb-2 border border-white/10 shadow-xl overflow-hidden"
        >
          {showCalendar ? (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "auto", minHeight: "620px", overflow: "scroll" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
            />
          ) : (
            <div
              className="w-full min-h-[620px] flex items-center justify-center text-ink-600 font-sans text-sm"
              /* Δεν είναι σφάλμα ούτε κενό: απλώς δεν έχει φτάσει ακόμη ο
                 επισκέπτης εδώ. Το `aria-live` ανακοινώνει την άφιξη. */
              aria-live="polite"
            >
              Φόρτωση ημερολογίου…
            </div>
          )}
        </div>

        {/* Outbound call alternative below the calendar */}
        <div className="text-center font-sans text-sm md:text-base text-slate-200 mt-2">
          ή καλέστε μας άμεσα στο{" "}
          <a
            href="tel:+302128488984"
            className="text-white hover:text-slate-100 font-bold underline focus:outline focus:outline-2 focus:outline-white rounded px-1 py-0.5"
          >
            210 28 48 984
          </a>
        </div>

      </div>
    </section>
  );
};

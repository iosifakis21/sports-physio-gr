"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CheckItem } from "@/components/CheckItem";

const CAL_NAMESPACE = "ραντεβου-φυσικοθεραπειας";
const CAL_LINK = "sports-physio-nxqxxx/ραντεβου-φυσικοθεραπειας";

export const Booking: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1D4ED8" },
          dark: { "cal-brand": "#1D4ED8" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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

        {/* Cal.com inline booking calendar. The min-height keeps the container
            from collapsing to zero before Cal.com's script mounts the iframe. */}
        <div className="w-full max-w-[1000px] bg-surface rounded-card p-2 sm:p-4 border border-white/10 shadow-xl overflow-hidden min-h-[640px] md:min-h-[720px]">
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CAL_LINK}
            style={{ width: "100%", height: "100%", minHeight: "620px", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "auto" }}
          />
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

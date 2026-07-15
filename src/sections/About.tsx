import React from "react";
import { SectionHeading } from "@/components/SectionHeading";

export const About: React.FC = () => {
  const credentials = [
    "Πτυχιούχος Φυσικοθεραπευτής",
    "Άδεια ασκήσεως επαγγέλματος",
    "Μετεκπαιδεύσεις",
  ];

  return (
    <section id="gnoriste-me" className="py-[56px] md:py-[96px] bg-surface select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-16">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Γνωρίστε με"
          heading="Ο Φυσικοθεραπευτής"
          subcopy="Μάθετε περισσότερα για την πορεία, τη φιλοσοφία και την επιστημονική κατάρτιση του Μιχάλη Σιούλη."
        />

        {/* 2-column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Portrait Placeholder (4/12 width) */}
          <div className="w-full lg:w-[33%] flex justify-center">
            <div className="w-full max-w-[340px] aspect-[4/5] bg-slate-100 rounded-card flex flex-col items-center justify-center border border-ink-900/5 relative shadow-sm overflow-hidden select-none">
              
              {/* Profile icon placeholder */}
              <div className="text-ink-900/20 flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="w-20 h-20"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="font-sans text-xs font-semibold uppercase text-ink-600 tracking-wider">
                  Φωτογραφία Μιχάλη Σιούλη
                </span>
              </div>

              {/* Decorative design accent */}
              <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-btn shadow">
                10+ Χρόνια Εμπειρίας
              </div>
            </div>
          </div>

          {/* Right Column - Credentials and Bio text (8/12 width) */}
          <div className="w-full lg:w-[67%] flex flex-col items-start gap-6 text-left">
            <div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 leading-tight">
                Μιχάλης Σιούλης
              </h3>
              <p className="font-sans font-medium text-primary text-sm sm:text-base mt-1.5 uppercase tracking-wider">
                Φυσικοθεραπευτής & Αθλητικός Θεραπευτής
              </p>
            </div>

            {/* Credentials Badges */}
            <div className="flex flex-wrap gap-2.5">
              {credentials.map((cred, index) => (
                <span
                  key={index}
                  className="bg-surface-alt border border-ink-900/10 text-ink-900 font-sans font-semibold text-xs sm:text-sm px-3.5 py-1.5 rounded-btn shadow-sm select-none"
                >
                  📄 {cred}
                </span>
              ))}
            </div>

            {/* First-person Biography Philosophy Text */}
            <p className="font-sans text-base md:text-lg text-ink-600 leading-relaxed max-w-3xl">
              «Πιστεύω στην επιστημονικά τεκμηριωμένη φυσικοθεραπεία (evidence-based practice) που εστιάζει στον εντοπισμό και την αντιμετώπιση της πραγματικής αιτίας του προβλήματος, και όχι απλά στην προσωρινή ανακούφιση του συμπτώματος. Μέσα από την εξατομικευμένη προσέγγιση και τη συνεργασία, σχεδιάζουμε μαζί το κατάλληλο πλάνο θεραπείας και αποκατάστασης που θα σας επιτρέψει να επιστρέψετε με ασφάλεια και σιγουριά στις καθημερινές ή αθλητικές σας δραστηριότητες.»
            </p>

            {/* Affiliations / Trust highlights */}
            <div className="flex items-center gap-3 border-t border-ink-900/10 pt-4 w-full text-sm font-sans text-ink-600">
              <span className="text-emerald-500 font-bold" aria-hidden="true">✔</span>
              <span>Επίσημο Μέλος του Πανελληνίου Συλλόγου Φυσικοθεραπευτών (Π.Σ.Φ.)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

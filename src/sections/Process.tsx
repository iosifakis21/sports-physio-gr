import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
}

export const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Αξιολόγηση & Ιστορικό",
      description: "Πραγματοποιούμε ενδελεχή κλινική εξέταση και λεπτομερή καταγραφή του ιστορικού σας για να κατανοήσουμε πλήρως τις ανάγκες σας.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
          />
        </svg>
      ),
      bullets: [
        "Λεπτομερές ιστορικό υγείας",
        "Κλινικά τεστ κινητικότητας",
        "Αξιολόγηση στάσης & πόνου",
      ],
    },
    {
      number: "02",
      title: "Εντοπισμός της Αιτίας",
      description: "Αναλύουμε τα κινητικά πρότυπα και τις δυσλειτουργίες για να βρούμε την πραγματική πηγή του πόνου και όχι απλά τα συμπτώματα.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),
      bullets: [
        "Ανάλυση κινητικών προτύπων",
        "Εντοπισμός δυσλειτουργιών",
        "Διάκριση αιτίας από συμπτώματα",
      ],
    },
    {
      number: "03",
      title: "Πλάνο Αποκατάστασης",
      description: "Σχεδιάζουμε ένα εξατομικευμένο πρόγραμμα θεραπείας βασισμένο σε επιστημονικά δεδομένα και στους δικούς σας στόχους.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      ),
      bullets: [
        "Εξατομικευμένο πρόγραμμα",
        "Στόχοι βασισμένοι σε δεδομένα",
        "Χρονοδιάγραμμα αποκατάστασης",
      ],
    },
    {
      number: "04",
      title: "Θεραπεία & Επανέλεγχος",
      description: "Εφαρμόζουμε τις θεραπευτικές τεχνικές, επανεκτιμούμε την πρόοδό σας σε κάθε επίσκεψη και προσαρμόζουμε το πλάνο ανάλογα.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
      bullets: [
        "Εφαρμογή θεραπευτικών τεχνικών",
        "Επανεκτίμηση σε κάθε επίσκεψη",
        "Προσαρμογή του πλάνου",
      ],
    },
  ];

  return (
    <section id="diadikasia" className="py-[56px] md:py-[96px] bg-surface select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-12 md:gap-16 items-center">

        {/* Section Heading */}
        <SectionHeading
          eyebrow="Διαδικασία"
          heading="Η Θεραπευτική μας Προσέγγιση"
          subcopy="Μια δομημένη, επιστημονική διαδικασία βήμα-βήμα για την ασφαλή και οριστική σας αποκατάσταση."
        />

        <div className="w-full max-w-5xl flex flex-col gap-8">

          {/* Numbered step indicator row + connecting line (desktop only) */}
          <div className="relative hidden lg:block" aria-hidden="true">
            {/* Connecting line spans from the center of the first badge to the center
                of the last: with 4 equal columns each badge center sits at 12.5% / 87.5% */}
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-[2px] bg-ink-900/10 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-4 relative z-10">
              {steps.map((step) => (
                <div key={step.number} className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md border-4 border-surface">
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group flex flex-col gap-4 bg-surface border border-ink-900/10 rounded-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary motion-safe:hover:scale-[1.03]"
              >
                {/* Icon badge */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  {step.icon}
                </div>

                {/* Step number label (visible on mobile where the indicator row is hidden) */}
                <span className="lg:hidden font-display font-bold text-xs uppercase tracking-wide text-primary">
                  Βήμα {step.number}
                </span>

                {/* Title + description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-ink-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-ink-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Benefits list */}
                <ul className="flex flex-col gap-2 mt-auto pt-2">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 font-sans text-sm text-ink-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-primary mt-0.5 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Conversion Button */}
        <div className="mt-4">
          <Button
            variant="primary"
            label="Κλείστε Ραντεβού"
            href="#kleiste-rantevou"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            }
          />
        </div>

      </div>
    </section>
  );
};

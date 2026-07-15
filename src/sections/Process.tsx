import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Αξιολόγηση & Ιστορικό",
      description: "Πραγματοποιούμε ενδελεχή κλινική εξέταση και λεπτομερή καταγραφή του ιστορικού σας για να κατανοήσουμε πλήρως τις ανάγκες σας.",
    },
    {
      number: "02",
      title: "Εντοπισμός της Αιτίας",
      description: "Αναλύουμε τα κινητικά πρότυπα και τις δυσλειτουργίες για να βρούμε την πραγματική πηγή του πόνου και όχι απλά τα συμπτώματα.",
    },
    {
      number: "03",
      title: "Πλάνο Αποκατάστασης",
      description: "Σχεδιάζουμε ένα εξατομικευμένο πρόγραμμα θεραπείας βασισμένο σε επιστημονικά δεδομένα και στους δικούς σας στόχους.",
    },
    {
      number: "04",
      title: "Θεραπεία & Επανέλεγχος",
      description: "Εφαρμόζουμε τις θεραπευτικές τεχνικές, επανεκτιμούμε την πρόοδό σας σε κάθε επίσκεψη και προσαρμόζουμε το πλάνο ανάλογα.",
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

        {/* Timeline container */}
        <div className="relative w-full max-w-5xl my-4">
          
          {/* Connector Line (Horizontal Desktop, Hidden Mobile) */}
          <div
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-ink-900/10 -translate-y-1/2 hidden lg:block z-0"
            aria-hidden="true"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10 w-full">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 bg-surface lg:bg-transparent p-6 lg:p-0 rounded-card lg:rounded-none border border-ink-900/5 lg:border-none shadow-sm lg:shadow-none hover:shadow-md lg:hover:shadow-none transition-all duration-200"
              >
                {/* Visual Connector Line (Vertical Mobile, Hidden Desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute w-[2px] bg-ink-900/10 left-1/2 -translate-x-1/2 h-16 lg:hidden"
                    style={{
                      // dynamically place the connecting line between vertical mobile cards
                      top: `calc(${index + 1} * 25% + 40px)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Number bubble */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md border-4 border-surface select-none">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-ink-900 leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed max-w-sm mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </div>
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

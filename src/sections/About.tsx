import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";

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

          {/* Left Column - Portrait (4/12 width) */}
          <AnimatedContainer
            className="w-full lg:w-[33%] flex justify-center"
            initial={{ opacity: 0, translateX: -24 }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            <div className="w-full max-w-[340px] aspect-[4/5] bg-slate-100 rounded-card border border-ink-900/5 relative shadow-sm overflow-hidden select-none">

              {/* Portrait photo */}
              <Image
                src="/images/portrait1.webp"
                alt="Ο φυσικοθεραπευτής Μιχάλης Σιούλης"
                fill
                sizes="(max-width: 1024px) 340px, 340px"
                className="object-cover object-top"
              />

              {/* Decorative design accent */}
              <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-btn shadow z-10">
                10+ Χρόνια Εμπειρίας
              </div>
            </div>
          </AnimatedContainer>

          {/* Right Column - Credentials and Bio text (8/12 width) */}
          <AnimatedContainer
            className="w-full lg:w-[67%] flex flex-col items-start gap-6 text-left"
            initial={{ opacity: 0, translateX: 24 }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
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
          </AnimatedContainer>

        </div>

      </div>
    </section>
  );
};
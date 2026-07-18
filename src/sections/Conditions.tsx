import React from "react";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { Button } from "@/components/Button";
import { ConditionsAnnotatedPhoto } from "@/components/ConditionsAnnotatedPhoto";

export const Conditions: React.FC = () => {
  return (
    <section
      id="fysikotherapeia"
      className="py-[56px] md:py-[96px] bg-surface-alt border-y border-ink-900/5 select-none scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] gap-12 lg:gap-10 items-center">

          {/* LEFT — heading, sub-line, two-column copy, CTA */}
          <div className="flex flex-col gap-6 md:gap-8">
            <AnimatedContainer>
              <h2 className="font-display font-extrabold text-ink-900 tracking-tight leading-[0.95] text-4xl sm:text-5xl xl:text-6xl">
                ΣΥΝΗΘΕΙΣ ΠΕΡΙΟΧΕΣ
                <br />
                ΤΡΑΥΜΑΤΙΣΜΟΥ
              </h2>
              <p className="mt-4 text-base md:text-lg font-medium text-ink-900">
                Είμαστε πρακτικοί και επικεντρωμένοι στο αποτέλεσμα.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                  Το Sports-Physio προσφέρει σε ασθενείς κάθε ηλικίας και
                  ικανότητας επαγγελματικές υπηρεσίες φυσικοθεραπείας μετά από
                  τραυματισμό ή χειρουργική επέμβαση. Οι σύγχρονες εγκαταστάσεις
                  φυσικοθεραπείας μας και η εξαιρετική μας ομάδα δημιουργούν ένα
                  ευχάριστο και παρακινητικό περιβάλλον.
                </p>
                <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                  Αναλαμβάνουμε ένα ευρύ φάσμα τραυματισμών, από εργασιακά και
                  τροχαία ατυχήματα μέχρι ορθοπεδικά και αθλητικά προβλήματα.
                  Δείτε πώς μπορούμε να σας βοηθήσουμε να πετύχετε τους στόχους
                  της φυσικοθεραπείας σας. Επιλέξτε μια κατηγορία για να μάθετε
                  περισσότερα.
                </p>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <Button label="Κλείστε Ραντεβού" href="#kleiste-rantevou" />
            </AnimatedContainer>
          </div>

          {/* RIGHT — annotated athlete photo with interactive dots */}
          <ConditionsAnnotatedPhoto />

        </div>
      </div>
    </section>
  );
};

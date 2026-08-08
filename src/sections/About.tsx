import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { Tilt } from "@/components/Tilt";
import { CredentialsStrip } from "@/components/CredentialsStrip";

export const About: React.FC = () => {
  const credentials = [
    "Πτυχίο Φυσικοθεραπείας (2003)",
    "MIDTERM-OMT (2008)",
    "Εξειδικευμένος Βελονιστής ΕΦΕΑ (2012)",
    "Medical Training Therapist (2015)",
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
            <Tilt
              rotationFactor={9}
              scaleFactor={1.02}
              shadow
              springOptions={{ stiffness: 150, damping: 20 }}
              className="w-full max-w-[340px] aspect-[4/5] bg-slate-100 rounded-card border border-ink-900/5 relative overflow-hidden select-none"
            >
              {/* Portrait photo */}
              <Image
                src="/images/portrait1.webp"
                alt="Ο φυσικοθεραπευτής Μιχάλης Σιούλης"
                fill
                sizes="(max-width: 1024px) 340px, 340px"
                className="object-cover object-top"
              />

              {/* Decorative design accent — inside the Tilt so it stays
                  anchored to the photo through the rotation. */}
              <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-btn shadow z-10">
                10+ Χρόνια Εμπειρίας
              </div>
            </Tilt>
          </AnimatedContainer>

          {/* Right Column - Credentials and Bio text (8/12 width) */}
          <AnimatedContainer
            className="w-full lg:w-[67%] flex flex-col items-start gap-6 text-left"
            initial={{ opacity: 0, translateX: 24 }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            <div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 leading-tight">
                Μιχάλης Σιούλης, ΜΤ, PT, MTT
              </h3>
              <p className="font-sans font-medium text-primary text-sm sm:text-base mt-1.5 uppercase tracking-wider">
                Αθλητικός Χειροθεραπευτής – Φυσικοθεραπευτής – Medical Training Therapist
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

            {/* Biography — career & education, sports specialisation, and the
                philosophy paragraph that closes in the site's "we" voice. */}
            <div className="flex flex-col gap-4 max-w-3xl font-sans text-base md:text-lg text-ink-600 leading-relaxed">
              <p>
                Απόφοιτος του Τμήματος Φυσικοθεραπείας του Α.Τ.Ε.Ι Θεσσαλονίκης (2003, βαθμός πτυχίου 8,2), ενεργό μέλος του Πανελλήνιου Συλλόγου Φυσικοθεραπευτών Ελλάδος. Απέκτησε τον τίτλο MIDTERM-OMT το 2008 από τον Πανελλήνιο Σύλλογο Χειροθεραπευτών Ελλάδος, όπου είναι τακτικό μέλος. Το 2012 πιστοποιήθηκε ως εξειδικευμένος βελονιστής στον μυοσκελετικό πόνο από την Ελληνική Εταιρεία Αλγολογίας (ΕΦΕΑ), και το 2015 απέκτησε τον τίτλο Medical Training Therapist από το International Academy of Medical Education – Sports Traumatology. Είναι μέλος της παγκόσμιας ομοσπονδίας KinesioTaping.
              </p>
              <p>
                Η ενασχόλησή του από μικρή ηλικία με τον αθλητισμό και η αγάπη του για τα μαχητικά αθλήματα τον οδήγησαν στην εξειδίκευση στους αθλητικούς τραυματισμούς. Από το 2017 εκπροσωπεί την Ελλάδα ως ενεργό μέλος της ICA (παγκόσμιας ομοσπονδίας Cutmen), είναι Φυσικοθεραπευτής &amp; Cutman της Εθνικής ομάδας Μουάι Τάι από το 2019, και σήμερα κατέχει τη θέση του Αντιπροέδρου της παγκόσμιας ομοσπονδίας World Cutman Association (WCA). Αποτέλεσμα αυτής της εξειδίκευσης είναι η συνεργασία του με κορυφαίους παγκόσμιους πρωταθλητές, όπως ο Μιχάλης Ζαμπίδης και ο Μιχάλης Αρναούτης.
              </p>
              <p>
                Πιστεύουμε στην επιστημονικά τεκμηριωμένη φυσικοθεραπεία (evidence-based practice) που εστιάζει στην πραγματική αιτία του προβλήματος και όχι στην προσωρινή ανακούφιση του συμπτώματος. Παρακολουθούμε και εξελίσσουμε συνεχώς τις γνώσεις μας στη φυσικοθεραπεία, τη χειροθεραπεία και τις νέες μεθόδους αποκατάστασης, με στόχο το καλύτερο δυνατό αποτέλεσμα για τους ασθενείς και τους αθλητές του κέντρου μας. Έχουμε επιλέξει συνεργάτες και βοηθούς φυσικοθεραπείας που πρώτα απ&apos; όλα διακρίνονται για τον χαρακτήρα τους, συνθέτοντας μαζί μια ομάδα που εξυπηρετεί πλήθος ασθενών και αθλητών με άριστα αποτελέσματα.
              </p>
            </div>

            {/* Interactive credentials / organisations strip */}
            <CredentialsStrip />
          </AnimatedContainer>

        </div>

      </div>
    </section>
  );
};
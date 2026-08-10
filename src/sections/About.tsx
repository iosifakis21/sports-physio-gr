import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
// Tilt is the last motion/react consumer on the homepage and lives below the
// fold, so it loads as its own chunk after hydration.
const Tilt = dynamic(() => import("@/components/Tilt").then((m) => m.Tilt));
import { CredentialsStrip } from "@/components/CredentialsStrip";

export const About: React.FC = () => {
  const credentials = [
    "Πτυχίο Φυσικοθεραπείας (2003)",
    "MIDTERM-OMT (2008)",
    "Εξειδικευμένος Βελονιστής ΕΦΕΑ (2012)",
    "Medical Training Therapist (2015)",
  ];

  const bioSections = [
    {
      title: "Εκπαίδευση & Πιστοποιήσεις",
      body: "Απόφοιτος Φυσικοθεραπείας (Α.Τ.Ε.Ι Θεσσαλονίκης, 2003) με εξειδίκευση στη χειροθεραπεία (MIDTERM-OMT), τον βελονισμό μυοσκελετικού πόνου και το Medical Training Therapy. Μέλος του Πανελλήνιου Συλλόγου Φυσικοθεραπευτών και της παγκόσμιας ομοσπονδίας KinesioTaping.",
    },
    {
      title: "Αθλητική Πορεία",
      body: "Η αγάπη του για τα μαχητικά αθλήματα τον οδήγησε στους αθλητικούς τραυματισμούς. Εκπροσωπεί την Ελλάδα στην ICA από το 2017, είναι Cutman της Εθνικής Μουάι Τάι και σήμερα Αντιπρόεδρος της World Cutman Association — συνεργαζόμενος με κορυφαίους πρωταθλητές όπως ο Μιχάλης Ζαμπίδης και ο Μιχάλης Αρναούτης.",
    },
    {
      title: "Η Φιλοσοφία μας",
      body: "Πιστεύουμε στην επιστημονικά τεκμηριωμένη φυσικοθεραπεία που εντοπίζει την πραγματική αιτία του προβλήματος, όχι μόνο το σύμπτωμα. Η ομάδα μας συνδυάζει τεχνογνωσία και χαρακτήρα για άριστα αποτελέσματα σε κάθε ασθενή και αθλητή.",
    },
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

        {/* 2-column Layout. Top-aligned on desktop rather than centred: the bio
            accordion changes the text column's height every time a panel opens,
            and centring made the photo slide down to re-centre against it. */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">

          {/* Left Column - Portrait (5/12 width) */}
          <AnimatedContainer
            className="w-full lg:w-[42%] flex justify-center"
            initial={{ opacity: 0, translateX: -24 }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            <Tilt
              rotationFactor={9}
              scaleFactor={1.02}
              shadow
              springOptions={{ stiffness: 150, damping: 20 }}
              /* Taller crop on desktop so the portrait finishes roughly level
                 with the collapsed bio column instead of leaving a short
                 stack next to it. */
              className="w-full max-w-[340px] lg:max-w-[440px] aspect-[4/5] lg:aspect-[2/3] bg-slate-100 rounded-card border border-ink-900/5 relative overflow-hidden select-none"
            >
              {/* Portrait photo */}
              <Image
                src="/images/portrait1.webp"
                alt="Ο φυσικοθεραπευτής Μιχάλης Σιούλης"
                fill
                sizes="(max-width: 1024px) 340px, 440px"
                className="object-cover object-top"
              />

              {/* Decorative design accent — inside the Tilt so it stays
                  anchored to the photo through the rotation. The inset grows
                  with the photo so the badge keeps the same optical margin. */}
              <div className="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-btn shadow z-10">
                20+ Χρόνια Εμπειρίας
              </div>
            </Tilt>
          </AnimatedContainer>

          {/* Right Column - Credentials and Bio text (7/12 width) */}
          <AnimatedContainer
            className="w-full lg:w-[58%] flex flex-col items-start gap-6 text-left"
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
                philosophy section that closes in the site's "we" voice.

                Same accordion as the FAQ: native <details>/<summary> sharing a
                `name`, which is what gives that section its one-open-at-a-time
                behaviour, so this group behaves identically without any state
                of its own. A separate group name keeps the two sections from
                closing each other. Native semantics also carry the keyboard
                support and expanded/collapsed state for free.

                The trigger keeps the labels' established treatment — the
                section eyebrow's style a step down in size — rather than the
                FAQ's larger question text, since these sit under the name and
                title here and shouldn't compete with them. */}
            <div className="w-full max-w-3xl flex flex-col gap-4">
              {bioSections.map((section) => (
                <details
                  key={section.title}
                  name="about-accordion" // Enforces "one open at a time", as in the FAQ
                  className="group bg-surface-alt border border-ink-900/5 rounded-card overflow-hidden transition-all duration-200 open:shadow-sm"
                >
                  <summary className="flex items-center justify-between p-4 sm:p-5 font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-primary cursor-pointer list-none select-none hover:bg-ink-900/5 focus:outline focus:outline-2 focus:outline-primary transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{section.title}</span>
                    <span className="text-primary group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4 font-mono font-normal">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 sm:p-5 pt-0 font-sans border-t border-ink-900/5">
                    <p className="text-sm md:text-base text-ink-600 leading-relaxed pt-4">
                      {section.body}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            {/* Interactive credentials / organisations strip */}
            <CredentialsStrip />
          </AnimatedContainer>

        </div>

      </div>
    </section>
  );
};
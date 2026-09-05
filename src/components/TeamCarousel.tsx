"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CarouselArrow } from "@/components/CarouselArrow";
import { teamMembers } from "@/content/team";

/**
 * Ένα και μόνο "κουτί" καρτέλας που δεν μετακινείται ποτέ: τα βέλη αλλάζουν
 * ποιο μέλος της ομάδας δείχνει, όχι τη θέση μιας σειράς από κάρτες.
 *
 * Όλα τα μέλη είναι στο DOM, στοιβαγμένα στο ίδιο κελί ενός grid (`col-start-1
 * row-start-1`). Αυτό δίνει τρία πράγματα δωρεάν:
 *  - το ύψος της κάρτας είναι πάντα του πιο "ψηλού" μέλους, οπότε το πλαίσιο
 *    δεν αναπηδά όταν αλλάζει βιογραφικό·
 *  - το crossfade είναι απλό transition αδιαφάνειας (και το globals.css το
 *    μηδενίζει αυτόματα σε `prefers-reduced-motion`)·
 *  - οι φωτογραφίες που δεν φαίνονται έχουν ήδη φορτώσει, άρα η εναλλαγή δεν
 *    περιμένει δίκτυο.
 * Τα κρυμμένα μέλη είναι `aria-hidden`, ώστε το live region να ανακοινώνει
 * μόνο το ενεργό.
 *
 * Νέο μέλος = μια εγγραφή στο `src/content/team.ts`, τίποτα άλλο.
 */
export const TeamCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = teamMembers.length;

  // `+ total` κρατάει το υπόλοιπο θετικό όταν πάμε πίσω από το πρώτο μέλος,
  // δηλαδή ο κύκλος κλείνει και προς τις δύο κατευθύνσεις.
  const step = (delta: number) => setIndex((current) => (current + delta + total) % total);

  // Τα βέλη είναι κανονικά <button>, οπότε Enter/Space δουλεύουν από μόνα τους·
  // αυτό προσθέτει και τα βελάκια του πληκτρολογίου όσο η εστίαση είναι μέσα
  // στο καρουζέλ.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  if (total === 0) return null;

  return (
    <div
      role="group"
      aria-label="Τα μέλη της ομάδας"
      onKeyDown={handleKeyDown}
      className="w-full max-w-3xl mx-auto flex flex-col gap-5"
    >
      {/* Το σταθερό πλαίσιο της κάρτας. Το περιεχόμενο μέσα του αλλάζει. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="grid w-full bg-surface-alt border border-ink-900/5 rounded-card shadow-sm overflow-hidden"
      >
        {teamMembers.map((member, memberIndex) => {
          const isActive = memberIndex === index;
          return (
            <div
              key={member.id}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 flex flex-col sm:flex-row transition-opacity duration-300 ease-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Φωτογραφία — σταθερή στήλη αριστερά από sm και πάνω, πλήρους
                  πλάτους πάνω από το κείμενο στο κινητό. Στο κινητό ο λόγος
                  4:3 κρατάει την κάρτα σε ένα ύψος που χωράει σε οθόνη
                  τηλεφώνου· `object-top` γιατί τα πορτραίτα έχουν το κεφάλι
                  ψηλά και το κάδρο κόβεται από κάτω. */}
              <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:w-[240px] md:w-[280px] flex-shrink-0 bg-slate-800">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover object-top"
                />
              </div>

              {/* Όνομα, ρόλος, βιογραφικό — ίδια τυπογραφία με το βιογραφικό
                  του Μιχάλη ακριβώς από πάνω. */}
              <div className="flex flex-col gap-2 p-5 sm:p-6 md:p-8">
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink-900 leading-tight">
                  {member.name}
                </h3>
                <p className="font-sans font-medium text-primary text-xs sm:text-sm uppercase tracking-wider">
                  {member.title}
                </p>
                <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed mt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Χειριστήρια: τα ίδια στρογγυλά βέλη με την ενότητα των αθλητών, με
          κουκκίδες ανάμεσά τους για τη θέση στη λίστα. Κάτω από την κάρτα
          ώστε να μην καλύπτουν τη φωτογραφία στο κινητό. */}
      <div className="flex items-center justify-center gap-4">
        <CarouselArrow
          direction="left"
          label="Προηγούμενο μέλος της ομάδας"
          onClick={() => step(-1)}
        />

        <div className="flex items-center gap-3">
          {teamMembers.map((member, memberIndex) => {
            const isActive = memberIndex === index;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setIndex(memberIndex)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Μέλος ${memberIndex + 1} από ${total}: ${member.name}`}
                /* Οι κουκκίδες ήταν 10×10 (και 24×10 η ενεργή) — κάτω από το
                   ελάχιστο 24×24 του WCAG 2.2 AA. Το `before:` δίνει περιοχή
                   αφής τουλάχιστον 24 πλάτος × 44 ύψος, χωρίς να μεγαλώσει
                   την ορατή κουκκίδα. Το `gap-3` του γονέα κρατά το βήμα στα
                   24px, ώστε οι περιοχές να μην επικαλύπτονται. */
                className={`relative h-2.5 rounded-full transition-all duration-200 cursor-pointer focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-full before:min-w-6 before:-translate-x-1/2 before:-translate-y-1/2 ${
                  isActive ? "w-6 bg-primary" : "w-2.5 bg-ink-900/20 hover:bg-ink-900/40"
                }`}
              />
            );
          })}
        </div>

        <CarouselArrow
          direction="right"
          label="Επόμενο μέλος της ομάδας"
          onClick={() => step(1)}
        />
      </div>
    </div>
  );
};

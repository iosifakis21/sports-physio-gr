import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SERVICES_HUB_PATH } from "@/content/service-pages";
import { CONDITIONS_HUB_PATH } from "@/lib/condition-paths";
import { BLOG_HUB_PATH } from "@/lib/blog-paths";

/**
 * Η ρίζα `not-found.tsx` πιάνει ΚΑΘΕ URL που δεν αντιστοιχεί σε διαδρομή του
 * site, όχι μόνο τις ρητές κλήσεις `notFound()`. Πριν υπήρχε, το Next.js
 * σέρβιρε τη δική του προεπιλεγμένη σελίδα — στα αγγλικά, με τίτλο
 * «404: This page could not be found.» μέσα σε ένα κατά τα άλλα ελληνικό site.
 *
 * Το Next.js προσθέτει αυτόματα `noindex` σε σελίδες που επιστρέφουν 404,
 * οπότε δεν χρειάζεται να δηλωθεί εδώ.
 */
export const metadata: Metadata = {
  title: "Η σελίδα δεν βρέθηκε | Sports-Physio.gr",
  description:
    "Η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί. Δείτε τις υπηρεσίες και τις παθήσεις που αντιμετωπίζουμε ή κλείστε ραντεβού.",
};

const destinations = [
  {
    href: SERVICES_HUB_PATH,
    title: "Υπηρεσίες",
    body: "Manual therapy, Tecar, κρουστικός υπέρηχος, dry needling και οι υπόλοιπες θεραπείες.",
  },
  {
    href: CONDITIONS_HUB_PATH,
    title: "Παθήσεις",
    body: "Οσφυαλγία, δισκοκήλη, τενοντοπάθειες, διαστρέμματα και άλλες 21 παθήσεις.",
  },
  {
    href: BLOG_HUB_PATH,
    title: "Blog",
    body: "Άρθρα φυσικοθεραπείας και νέα από το SportsPhysio.",
  },
];

export default function NotFound() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-[56px] md:py-[96px] flex flex-col items-center gap-10 md:gap-12">

      <div className="flex flex-col items-center text-center gap-3 max-w-2xl">
        <span className="font-mono font-bold text-sm tracking-[0.2em] text-primary">
          404
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 font-display tracking-tight text-balance">
          Η σελίδα δεν βρέθηκε
        </h1>
        <p className="mt-1 text-base md:text-lg text-ink-600 font-sans leading-relaxed">
          Η διεύθυνση που ακολουθήσατε δεν αντιστοιχεί σε σελίδα του site — ίσως
          έχει αλλάξει ή να υπάρχει κάποιο τυπογραφικό λάθος στο URL.
        </p>
      </div>

      {/* Κύρια διέξοδος: το ραντεβού. Δεν αφήνουμε τον επισκέπτη σε αδιέξοδο. */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          href="/#kleiste-rantevou"
          calPopup
          variant="primary"
          label="Κλείστε Ραντεβού"
        />
        <Button href="/" variant="secondary" label="Επιστροφή στην αρχική" />
      </div>

      {/* Δευτερεύουσες διαδρομές — οι τρεις κόμβοι του site. */}
      {/* Το h2 είναι μόνο για αναγνώστες οθόνης: χωρίς αυτό η σελίδα πήγαινε
          από το h1 κατευθείαν στα h3 του υποσελίδου («Στοιχεία Επικοινωνίας»),
          που το axe αναφέρει ως `heading-order`. */}
      <h2 className="sr-only">Προτεινόμενες σελίδες</h2>
      <nav
        aria-label="Προτεινόμενες σελίδες"
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {destinations.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="bg-surface-alt border border-ink-900/10 rounded-card p-5 flex flex-col gap-1.5 transition-colors hover:border-primary/40 hover:bg-ink-900/[0.03] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
            <span className="font-display font-bold text-ink-900">
              {d.title} →
            </span>
            <span className="font-sans text-sm text-ink-600 leading-relaxed">
              {d.body}
            </span>
          </Link>
        ))}
      </nav>

      <p className="font-sans text-sm text-ink-600 text-center">
        Ή τηλεφωνήστε μας στο{" "}
        <a
          href="tel:+302128488984"
          className="text-primary font-semibold hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
        >
          210 28 48 984
        </a>
        .
      </p>

    </div>
  );
}

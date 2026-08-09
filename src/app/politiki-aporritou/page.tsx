import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Πολιτική Απορρήτου | Sports-Physio.gr",
  description:
    "Πώς το Sports-Physio.gr συλλέγει, επεξεργάζεται και προστατεύει τα προσωπικά σας δεδομένα κατά τη χρήση του ιστότοπου και της φόρμας κρατήσεων.",
  alternates: {
    canonical: "/politiki-aporritou",
  },
  // Νομική/βοηθητική σελίδα: δεν χρειάζεται να εμφανίζεται στα αποτελέσματα
  // αναζήτησης, αλλά οι εσωτερικοί της σύνδεσμοι πρέπει να ακολουθούνται.
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-[56px] md:py-[96px] flex flex-col gap-8 md:gap-12 items-center">
      
      {/* Heading */}
      <SectionHeading
        eyebrow="Νομικά Έγγραφα"
        heading="Πολιτική Απορρήτου"
        subcopy="Ενημερωθείτε σχετικά με τη συλλογή, επεξεργασία και προστασία των προσωπικών σας δεδομένων."
      />

      {/* Main Text Content */}
      <div className="max-w-3xl w-full bg-surface-alt p-6 md:p-10 rounded-card border border-ink-900/5 font-sans text-sm md:text-base text-ink-600 flex flex-col gap-6 leading-relaxed">
        
        <p>
          Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο το φυσικοθεραπευτήριο του <strong>Μιχάλη Σιούλη (Sports-Physio.gr)</strong> συλλέγει, χρησιμοποιεί και προστατεύει τις πληροφορίες που μας παρέχετε κατά τη χρήση του ιστότοπού μας και της φόρμας κρατήσεων.
        </p>

        <div>
          <h3 className="font-display font-bold text-lg text-ink-900 mb-2">
            1. Ποια δεδομένα συλλέγουμε
          </h3>
          <p>
            Κατά τη χρήση της φόρμας κρατήσεων, συλλέγουμε μόνο τα απολύτως απαραίτητα στοιχεία για την οργάνωση του ραντεβού σας:
          </p>
          <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
            <li>Ονοματεπώνυμο</li>
            <li>Αριθμό τηλεφώνου</li>
            <li>Διεύθυνση ηλεκτρονικού ταχυδρομείου (email) — προαιρετικά</li>
            <li>Την υπηρεσία που επιλέξατε και την προτιμώμενη μέρα και ώρα</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg text-ink-900 mb-2">
            2. Σκοπός της επεξεργασίας
          </h3>
          <p>
            Τα προσωπικά σας δεδομένα χρησιμοποιούνται αποκλειστικά και μόνο για:
          </p>
          <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
            <li>Την επιβεβαίωση και διαχείριση του ραντεβού σας.</li>
            <li>Την επικοινωνία μαζί σας σε περίπτωση αλλαγής ή ακύρωσης.</li>
            <li>Την παροχή των ζητούμενων υπηρεσιών φυσικοθεραπείας.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg text-ink-900 mb-2">
            3. Προστασία δεδομένων
          </h3>
          <p>
            Δεν αποθηκεύουμε τα δεδομένα σας στο τοπικό πρόγραμμα περιήγησης (localStorage/sessionStorage) και δεν τα κοινοποιούμε σε τρίτους χωρίς τη ρητή συγκατάθεσή σας, εκτός εάν απαιτείται από το νόμο. Τα δεδομένα διαβιβάζονται με ασφάλεια μέσω κρυπτογραφημένων πρωτοκόλλων.
          </p>
        </div>

        <div>
          <h3 className="font-display font-bold text-lg text-ink-900 mb-2">
            4. Τα δικαιώματά σας
          </h3>
          <p>
            Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε το δικαίωμα πρόσβασης, διόρθωσης, διαγραφής ή περιορισμού της επεξεργασίας των δεδομένων σας ανά πάσα στιγμή. Για οποιοδήποτε αίτημα, μπορείτε να επικοινωνήσετε μαζί μας στο <a href="mailto:msioulis@yahoo.gr" className="text-primary hover:underline font-semibold">msioulis@yahoo.gr</a>.
          </p>
        </div>

      </div>
    </div>
  );
}

/**
 * Τύποι για το περιεχόμενο των σελίδων παθήσεων (/pathiseis/[slug]).
 *
 * Ίδιο μοτίβο με τις σελίδες υπηρεσιών (`src/content/service-pages/`): κάθε
 * πάθηση έχει το δικό της αρχείο με το ελληνικό κείμενο, και η δομή/εμφάνιση
 * της σελίδας φτιάχνεται από το `ConditionPageTemplate`.
 */

import type { ConditionCategoryId } from "./categories";

/**
 * Ένα μπλοκ κειμένου μέσα σε μια ενότητα της σελίδας.
 *
 * Το σκέτο `string` είναι παράγραφος — έτσι τα περισσότερα αρχεία γράφονται
 * απλά ως λίστα από παραγράφους. Τα υπόλοιπα είδη υπάρχουν για να μπορεί το
 * περιεχόμενο του παλιού sports-physio.gr να μεταφερθεί **αυτούσιο**, με τις
 * υπο-επικεφαλίδες, τις αριθμημένες λίστες και τους πίνακές του.
 */
export type ConditionBlock =
  | string
  | { kind: "heading"; text: string }
  | {
      kind: "list";
      items: string[];
      /**
       * `disc` = κουκκίδες (προεπιλογή), `none` = χωρίς σύμβολο — για λίστες
       * που κουβαλάνε ήδη τη δική τους αρίθμηση μέσα στο κείμενο («1.», «α.»).
       */
      marker?: "disc" | "none";
    }
  | {
      kind: "table";
      /** Οι δύο επικεφαλίδες των στηλών. Αν λείπουν, ο πίνακας δεν έχει head. */
      head?: [string, string];
      rows: [string, string][];
    };

/** Ένας σύνδεσμος προς μια υπάρχουσα σελίδα υπηρεσίας. */
export interface RelatedServiceLink {
  /** Το slug της υπηρεσίας — βλ. `src/content/services.json`. */
  slug: string;
  /** Προαιρετικό: κείμενο συνδέσμου. Αν λείπει, μπαίνει ο τίτλος της υπηρεσίας. */
  label?: string;
}

export interface ConditionPageContent {
  /** Το τμήμα του URL: /pathiseis/<slug> */
  slug: string;
  /** Η κατηγορία στην οποία ανήκει η πάθηση (βλ. `categories.ts`). */
  categoryId: ConditionCategoryId;
  /** Το όνομα της πάθησης, όπως εμφανίζεται σε breadcrumbs και λίστες. */
  name: string;

  /** Τα SEO στοιχεία της σελίδας. */
  meta: {
    /** Μπαίνει στο <title> ως: "<title> | Sports-Physio.gr — Μιχάλης Σιούλης" */
    title: string;
    /** Η meta description (ιδανικά 140–160 χαρακτήρες). */
    description: string;
  };

  /** Η επικεφαλίδα της σελίδας: όνομα πάθησης + σύντομη εισαγωγή. */
  hero: {
    title: string;
    intro: string;
  };

  /** Ενότητα «Τι Είναι» — παράγραφοι και, όπου χρειάζεται, λίστες/πίνακες. */
  whatIs: ConditionBlock[];

  /** Ενότητα «Συμπτώματα» — λίστα με κουκκίδες. */
  symptoms: string[];

  /** Ενότητα «Πώς Βοηθάμε» — μπλοκ κειμένου + σύνδεσμοι σε σελίδες υπηρεσιών. */
  howWeHelp: {
    paragraphs: ConditionBlock[];
    /** Σχετικές υπηρεσίες (/ypiresies/<slug>). Κενό = δεν εμφανίζονται. */
    relatedServices: RelatedServiceLink[];
  };
}

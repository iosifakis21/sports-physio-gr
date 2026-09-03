/**
 * Τύποι για το περιεχόμενο των σελίδων παθήσεων (/pathiseis/[slug]).
 *
 * Ίδιο μοτίβο με τις σελίδες υπηρεσιών (`src/content/service-pages/`): κάθε
 * πάθηση έχει το δικό της αρχείο με το ελληνικό κείμενο, και η δομή/εμφάνιση
 * της σελίδας φτιάχνεται από το `ConditionPageTemplate`.
 */

import type { ConditionCategoryId } from "./categories";

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

  /** Ενότητα «Τι Είναι» — μία ή περισσότερες παράγραφοι. */
  whatIs: string[];

  /** Ενότητα «Συμπτώματα» — λίστα με κουκκίδες. */
  symptoms: string[];

  /** Ενότητα «Πώς Βοηθάμε» — παράγραφοι + σύνδεσμοι σε σελίδες υπηρεσιών. */
  howWeHelp: {
    paragraphs: string[];
    /** Σχετικές υπηρεσίες (/ypiresies/<slug>). Κενό = δεν εμφανίζονται. */
    relatedServices: RelatedServiceLink[];
  };
}

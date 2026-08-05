/**
 * Τύποι για το περιεχόμενο των σελίδων υπηρεσιών (/ypiresies/[slug]).
 *
 * Κάθε υπηρεσία έχει το δικό της αρχείο μέσα στο `src/content/service-pages/`.
 * Γράψτε εκεί το ελληνικό κείμενο — η δομή/εμφάνιση της σελίδας φτιάχνεται
 * αυτόματα από το `ServicePageTemplate`.
 */

/** Ένα «μπλοκ» κειμένου στο κυρίως σώμα της σελίδας. */
export type ServiceBodyBlock =
  /** Υπότιτλος ενότητας (εμφανίζεται ως <h2>). */
  | { type: "heading"; text: string }
  /** Απλή παράγραφος. */
  | { type: "paragraph"; text: string }
  /** Λίστα με κουκκίδες. */
  | { type: "list"; items: string[] };

/** Μία ερώτηση/απάντηση για το προαιρετικό FAQ στο τέλος της σελίδας. */
export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  /** Το τμήμα του URL: /ypiresies/<slug> */
  slug: string;
  /** Το `id` της αντίστοιχης υπηρεσίας στο `src/content/services.json`. */
  serviceId: string;

  /** Τα SEO στοιχεία της σελίδας. */
  meta: {
    /** Μπαίνει στο <title> ως: "<title> | Sports-Physio.gr — Μιχάλης Σιούλης" */
    title: string;
    /** Η meta description (ιδανικά 140–160 χαρακτήρες). */
    description: string;
  };

  /** Η επικεφαλίδα της σελίδας (τίτλος, εισαγωγή, φωτογραφία). */
  hero: {
    title: string;
    intro: string;
    /** Διαδρομή αρχείου μέσα στο `public/`, π.χ. "/images/kinesiotaping.webp". */
    photo: string;
  };

  /** Το κυρίως κείμενο, σε σειρά εμφάνισης. */
  body: ServiceBodyBlock[];

  /**
   * Προαιρετικό: ids ομάδων παθήσεων από το `src/content/conditions.json`
   * (π.χ. "back-neck", "shoulder"). Αν λείπει ή είναι κενό, η ενότητα δεν
   * εμφανίζεται καθόλου.
   */
  relatedConditions?: string[];

  /**
   * Προαιρετικό: συχνές ερωτήσεις ειδικά για αυτή την υπηρεσία. Αν λείπει ή
   * είναι κενό, η ενότητα δεν εμφανίζεται καθόλου.
   */
  faq?: ServiceFaqItem[];
}

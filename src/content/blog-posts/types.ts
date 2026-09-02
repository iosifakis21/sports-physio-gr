/**
 * Τύποι για το περιεχόμενο των άρθρων του blog (/blog/[slug]).
 *
 * Ίδιο μοτίβο με τις σελίδες παθήσεων (`src/content/condition-pages/`): κάθε
 * άρθρο έχει το δικό του αρχείο με το ελληνικό κείμενο, και η δομή/εμφάνιση
 * της σελίδας φτιάχνεται από το `BlogPostTemplate`.
 */

/** Η κατηγορία ενός άρθρου, όπως εμφανίζεται σε ετικέτες και στη λίστα. */
export type BlogCategory = "arthra-fysikotherapeias" | "nea";

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "arthra-fysikotherapeias": "Άρθρα Φυσικοθεραπείας",
  nea: "Νέα",
};

/** Ένα «μπλοκ» περιεχομένου μέσα στο σώμα ενός άρθρου. */
export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "image"; src: string; alt: string; caption?: string };

/** Ένας σύνδεσμος προς μια υπάρχουσα σελίδα υπηρεσίας. */
export interface BlogRelatedServiceLink {
  /** Το slug της υπηρεσίας — βλ. `src/content/services.json`. */
  slug: string;
  /** Προαιρετικό: κείμενο συνδέσμου. Αν λείπει, μπαίνει ο τίτλος της υπηρεσίας. */
  label?: string;
}

export interface BlogPostContent {
  /** Το τμήμα του URL: /blog/<slug> */
  slug: string;
  /** Η κατηγορία του άρθρου. */
  category: BlogCategory;
  /** Ο τίτλος του άρθρου, όπως εμφανίζεται σε breadcrumbs και λίστες. */
  title: string;
  /** Σύντομη περίληψη — εμφανίζεται στην κάρτα της λίστας άρθρων. */
  excerpt: string;
  /** Ημερομηνία δημοσίευσης, μορφή ISO (YYYY-MM-DD). */
  publishedAt: string;
  /** Προαιρετικός συγγραφέας — προεπιλογή "Μιχάλης Σιούλης" αν λείπει. */
  author?: string;

  /** Εικόνα εξωφύλλου — εμφανίζεται στην κάρτα της λίστας και στη σελίδα. */
  coverImage?: {
    src: string;
    alt: string;
  };

  /** Τα SEO στοιχεία της σελίδας. */
  meta: {
    /** Μπαίνει στο <title> ως: "<title> | Sports-Physio.gr — Μιχάλης Σιούλης" */
    title: string;
    /** Η meta description (ιδανικά 140–160 χαρακτήρες). */
    description: string;
  };

  /** Το σώμα του άρθρου. */
  body: BlogBodyBlock[];

  /** Σχετικές υπηρεσίες (/ypiresies/<slug>). Κενό ή απόν = δεν εμφανίζονται. */
  relatedServices?: BlogRelatedServiceLink[];
}

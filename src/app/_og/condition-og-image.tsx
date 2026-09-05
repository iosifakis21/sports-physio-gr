import { conditionPages } from "@/content/condition-pages";
import { renderOgImage, size, contentType } from "./og-image";

/**
 * Η εικόνα Open Graph των σελίδων παθήσεων (/pathiseis/<slug>).
 *
 * Όπως και στις υπηρεσίες, κάθε πάθηση είναι δικό της στατικό segment, οπότε
 * χρειάζεται ένα λεπτό `opengraph-image.tsx` ανά φάκελο που καλεί το παρακάτω.
 */

export { size, contentType };

/** Ο τίτλος και η σύντομη περιγραφή μιας πάθησης, με βάση το slug της. */
export function conditionOgCopy(slug: string): { title: string; tagline: string } {
  const page = conditionPages.find((p) => p.slug === slug);

  return {
    title: page?.meta.title ?? "Πάθηση",
    tagline: page?.meta.description ?? "",
  };
}

/** Το `alt` της εικόνας μιας πάθησης. */
export const conditionOgAlt = (slug: string): string =>
  `${conditionOgCopy(slug).title} — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.`;

/** Παράγει την εικόνα OG της πάθησης με το δοσμένο slug. */
export async function renderConditionOgImage(slug: string) {
  const { title, tagline } = conditionOgCopy(slug);
  return renderOgImage({ badge: "Πάθηση", title, tagline });
}

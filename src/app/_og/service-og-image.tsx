import servicesData from "@/content/services.json";
import { servicePages } from "@/content/service-pages";
import { renderOgImage, size, contentType } from "./og-image";

/**
 * Η εικόνα Open Graph των σελίδων υπηρεσιών.
 *
 * Το οπτικό πρότυπο ζει πλέον στο `./og-image.tsx` και το μοιράζονται και οι
 * σελίδες παθήσεων και τα άρθρα του blog. Εδώ μένει μόνο το «από πού έρχεται
 * το κείμενο μιας υπηρεσίας».
 *
 * Κάθε `src/app/ypiresies/<slug>/opengraph-image.tsx` είναι ένα λεπτό
 * περιτύλιγμα γύρω από αυτό το αρχείο — δεν μπορεί να μπει ένα κοινό `[slug]`
 * segment, γιατί οι σελίδες είναι στατικά segments και το Next αναζητά το
 * `opengraph-image` μέσα στο ίδιο segment με τη σελίδα.
 */

export { size, contentType };

/** Ο τίτλος και η σύντομη περιγραφή μιας υπηρεσίας, με βάση το slug της. */
export function serviceOgCopy(slug: string): { title: string; tagline: string } {
  const page = servicePages.find((p) => p.slug === slug);
  const service = servicesData.find((s) => s.slug === slug || s.id === page?.serviceId);

  return {
    title: service?.title ?? page?.meta.title ?? "Υπηρεσία",
    tagline: service?.description ?? page?.hero.intro ?? "",
  };
}

/** Το `alt` της εικόνας μιας υπηρεσίας. */
export const serviceOgAlt = (slug: string): string =>
  `${serviceOgCopy(slug).title} — Sports-Physio.gr, Μιχάλης Σιούλης, Φυσικοθεραπευτής.`;

/** Παράγει την εικόνα OG της υπηρεσίας με το δοσμένο slug. */
export async function renderServiceOgImage(slug: string) {
  const { title, tagline } = serviceOgCopy(slug);
  return renderOgImage({ badge: "Υπηρεσία", title, tagline });
}

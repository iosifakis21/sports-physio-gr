/**
 * Οι διαδρομές των παθήσεων, χωριστά από το `src/content/condition-pages/`.
 *
 * Ίδιος λόγος με το `blog-paths.ts`: το `condition-pages/index.ts` φορτώνει και
 * τα 21 αρχεία περιεχομένου, οπότε δεν πρέπει να το κάνει import client code
 * (π.χ. η κεφαλίδα) — θα κουβαλούσε όλο το κείμενο των παθήσεων στο bundle.
 * Εδώ είναι μόνο strings.
 */

/** Η σελίδα-κόμβος με όλες τις παθήσεις (βλ. `src/app/pathiseis/page.tsx`). */
export const CONDITIONS_HUB_PATH = "/pathiseis";

/** Το URL μιας σελίδας πάθησης, π.χ. "/pathiseis/osfyalgia". */
export const conditionPageHref = (slug: string) =>
  `${CONDITIONS_HUB_PATH}/${slug}`;

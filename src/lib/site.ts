/**
 * ⚠️ TODO — ΑΛΛΑΓΗ ΣΕ ΠΡΑΓΜΑΤΙΚΟ DOMAIN ⚠️
 * ---------------------------------------------------------------------------
 * Το sports-physio.gr ΔΕΝ είναι ακόμη συνδεδεμένο. Το site είναι live μόνο στο
 * https://sports-physio-gr.vercel.app και όλα τα απόλυτα URL δείχνουν εκεί.
 *
 * ΜΟΛΙΣ συνδεθεί το domain στο Vercel, αρκεί να αλλάξει η σταθερά `SITE_URL`
 * παρακάτω σε "https://sports-physio.gr". Ολόκληρο το site διαβάζει από εδώ —
 * δεν υπάρχει άλλο σημείο με hard-coded domain στον κώδικα.
 *
 * Πλήρης λίστα των σημείων που κληρονομούν αυτή την τιμή (για έλεγχο μετά
 * την αλλαγή — κανένα δεν χρειάζεται χειροκίνητη επεξεργασία):
 *
 *   src/lib/site.ts                  ← ΤΟ ΜΟΝΟ ΣΗΜΕΙΟ ΠΟΥ ΑΛΛΑΖΕΙ
 *   src/lib/schema.ts                → όλα τα @id του JSON-LD graph
 *                                      (#physiotherapy, #website,
 *                                       #michalis-sioulis, #service-*,
 *                                       #faq, #breadcrumb, #review-*)
 *   src/app/layout.tsx               → metadataBase (canonical + OG URLs)
 *   src/app/sitemap.ts               → κάθε <loc> του sitemap.xml
 *   src/app/robots.ts                → η γραμμή Sitemap: του robots.txt
 *   src/content/service-pages/index.ts → canonical/OG των σελίδων υπηρεσιών
 *                                        (σχετικές διαδρομές μέσω metadataBase)
 *
 * Μετά την αλλαγή: `grep -rn "vercel.app" src/` πρέπει να μην επιστρέφει τίποτα
 * εκτός από τα σχόλια αυτού του αρχείου.
 * ---------------------------------------------------------------------------
 */
export const SITE_URL = "https://sports-physio-gr.vercel.app";

/** Το εμπορικό όνομα του site, όπως εμφανίζεται σε τίτλους και OG tags. */
export const SITE_NAME = "Sports-Physio.gr";

/**
 * Οι διαδρομές του blog, χωριστά από το `src/lib/blog.ts`.
 *
 * Το `blog.ts` διαβάζει τον φάκελο των άρθρων με `node:fs`, οπότε μπορεί να
 * φορτωθεί μόνο σε server code. Οι σταθερές εδώ είναι καθαρά strings και
 * μπορούν να χρησιμοποιηθούν από οπουδήποτε (π.χ. `src/lib/schema.ts`, που
 * φορτώνεται και από το υποσέλιδο).
 */

/** Η σελίδα-κόμβος του blog (βλ. `src/app/blog/page.tsx`). */
export const BLOG_HUB_PATH = "/blog";

/** Το URL ενός άρθρου, π.χ. "/blog/paradeigma-arthrou". */
export const blogPostHref = (slug: string) => `${BLOG_HUB_PATH}/${slug}`;

/**
 * Μοναδική πηγή αλήθειας για το βασικό URL του site.
 *
 * Χρησιμοποιείται από:
 * - το `metadataBase` στο `src/app/layout.tsx` (ώστε τα υπόλοιπα metadata να
 *   γράφονται με σχετικές διαδρομές και να αναλύονται αυτόματα),
 * - το sitemap/robots, που απαιτούν απόλυτα URL,
 * - τα JSON-LD schemas, που επίσης απαιτούν απόλυτα URL.
 */
export const SITE_URL = "https://sports-physio.gr";

/** Το εμπορικό όνομα του site, όπως εμφανίζεται σε τίτλους και OG tags. */
export const SITE_NAME = "Sports-Physio.gr";

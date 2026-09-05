import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Δεν χρησιμοποιούμε nonce. Ο επίσημος οδηγός του Next.js για «strict CSP»
 * παράγει nonce ανά αίτημα μέσω `proxy.ts`, κάτι που ΕΠΙΒΑΛΛΕΙ dynamic
 * rendering — και οι 64 σελίδες αυτού του site είναι στατικές. Θα χανόταν
 * ολόκληρο το static generation για ένα CSP που, χωρίς inline scripts δικά
 * μας, δεν προσφέρει αντίστοιχο όφελος.
 *
 * Το `'unsafe-inline'` στο `script-src` είναι απαραίτητο: το Next.js ενσωματώνει
 * inline scripts για hydration και streaming. Το CSP εδώ δεν σταματά XSS μέσω
 * inline κώδικα, σταματά όμως τη φόρτωση scripts από τρίτους domains — που
 * είναι ο ρεαλιστικός φορέας επίθεσης για ένα στατικό marketing site.
 *
 * Οι γραμματοσειρές είναι self-hosted μέσω `next/font`, οπότε δεν χρειάζεται
 * καταχώριση για fonts.googleapis.com / fonts.gstatic.com.
 */
const cspDirectives = [
  "default-src 'self'",
  // Το Cal.com φορτώνει το embed script του από το app.cal.com.
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://cal.com",
  // Το Tailwind και τα inline styles του AnimatedContainer απαιτούν unsafe-inline.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://app.cal.com https://cal.com",
  "font-src 'self' data:",
  // Το inline booking calendar είναι iframe από το Cal.com.
  "frame-src 'self' https://app.cal.com https://cal.com",
  "connect-src 'self' https://app.cal.com https://cal.com",
  // Τα βίντεο των αθλητών (hover στις κάρτες της ενότητας «Αθλητές») δεν
  // είναι τοπικά: σερβίρονται από bucket του Supabase Storage — βλ.
  // `hoverVideo` στο `src/content/athletes.json`. Χωρίς αυτή τη γραμμή το CSP
  // τα μπλοκάρει και τα βίντεο απλώς δεν παίζουν.
  "media-src 'self' https://zndltavpvowndrvvpepf.supabase.co",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Το `x-powered-by: Next.js` δεν προσφέρει τίποτα στον επισκέπτη και
  // δηλώνει το framework (και άρα τα advisories που το αφορούν).
  poweredByHeader: false,

  images: {
    // Τα `remotePatterns` για utfs.io / *.ufs.sh ήταν κατάλοιπο του starter
    // template — καμία εικόνα του site δεν είναι απομακρυσμένη, όλες ζουν στο
    // /public. Κάθε επιτρεπόμενο pattern είναι σημείο από το οποίο τρίτοι
    // μπορούν να περνούν αυθαίρετες εικόνες μέσα από τον optimizer μας.
    //
    // Περιορίζουμε ρητά τον optimizer στα τοπικά αρχεία:
    localPatterns: [{ pathname: "/images/**", search: "" }],

    // Οι προεπιλογές του Next.js παράγουν 15 υποψήφια πλάτη ανά εικόνα
    // (imageSizes + deviceSizes), μέχρι 3840w — ακόμη και για λογότυπα που
    // εμφανίζονται σε 40px. Με 110 εικόνες στην αρχική, αυτά τα srcSet ήταν
    // το μεγαλύτερο μέρος των 547 KB HTML.
    //
    // Το μεγαλύτερο container του site είναι 1280px (βλ. --max-width στο
    // tokens.css), οπότε το 1920 καλύπτει ήδη οθόνες 2x· τα 2048/3840 δεν
    // επιλέγονται ποτέ από browser σε αυτό το layout.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },

  async headers() {
    return [
      {
        // Όλες οι διαδρομές, συμπεριλαμβανομένων των στατικών αρχείων.
        source: "/:path*",
        headers: [
          {
            // max-age = 1 έτος, ΧΩΡΙΣ `includeSubDomains` και ΧΩΡΙΣ `preload`.
            //
            // Το προηγούμενο `max-age=300` ήταν σκόπιμα προσωρινό, αλλά το
            // Lighthouse το μετρά ως αδύναμη πολιτική HSTS («Use a strong HSTS
            // policy») και έριχνε το Best Practices από 77 σε 73. Το ένα έτος
            // είναι το κατώφλι που ζητά.
            //
            // Το `includeSubDomains` και το `preload` παραμένουν ΕΚΤΟΣ επίτηδες:
            // επιβάλλουν HTTPS σε ΚΑΘΕ μελλοντικό subdomain του
            // sports-physio.gr — και το `preload` είναι πρακτικά μη
            // αναστρέψιμο, αφού περνά σε λίστα ενσωματωμένη στους browsers.
            // Προστίθενται μόνο αφού συνδεθεί το domain και επιβεβαιωθεί ότι
            // κάθε subdomain σερβίρει HTTPS.
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            // Απομονώνει το browsing context group της σελίδας από παράθυρα
            // που ανοίγει η ίδια ή που την άνοιξαν. Το Lighthouse το ελέγχει
            // ως «Ensure proper origin isolation with COOP».
            //
            // `same-origin-allow-popups` και ΟΧΙ σκέτο `same-origin`: το
            // δεύτερο θα έκοβε την επικοινωνία με popup τρίτου, που είναι
            // ακριβώς ο τρόπος που δουλεύουν κάποιες ροές πληρωμής/κράτησης
            // του Cal.com. Η παραλλαγή με τα popups περνά τον έλεγχο και
            // αφήνει τη ροή κράτησης άθικτη.
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            // Αποτρέπει το clickjacking — να μη φορτώνεται το site μέσα σε
            // iframe τρίτου, με τη φόρμα κρατήσεων από κάτω.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Ο browser σέβεται το δηλωμένο Content-Type και δεν «μαντεύει».
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Το πλήρες URL δεν διαρρέει σε τρίτους — σημαντικό εδώ, όπου το
            // path αποκαλύπτει την πάθηση που διάβαζε ο επισκέπτης.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // ΠΡΟΣΩΡΙΝΑ σε Report-Only: καταγράφει παραβιάσεις στην κονσόλα
            // χωρίς να μπλοκάρει τίποτα. Ελέγξτε ότι το Cal.com embed και οι
            // κρατήσεις δουλεύουν κανονικά, δείτε την κονσόλα για αναφορές,
            // και μετά μετονομάστε το κλειδί σε `Content-Security-Policy`.
            key: "Content-Security-Policy-Report-Only",
            value: cspDirectives,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

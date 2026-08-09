import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { SITE_URL } from "@/lib/site";

/**
 * Τα επίσημα προφίλ της επιχείρησης. Χρησιμοποιούνται και στο `sameAs` του
 * JSON-LD (για να αναγνωρίσει η Google την οντότητα) και στα ορατά εικονίδια
 * του υποσέλιδου, ώστε να μένουν πάντα συγχρονισμένα.
 */
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/sportsphysiomsioulis/",
  instagram: "https://www.instagram.com/physio_sioulis_cutman/",
} as const;

/** Το Google Business Profile — το ισχυρότερο `sameAs` για τοπικό SEO. */
const GOOGLE_BUSINESS_PROFILE_URL =
  "https://www.google.com/maps/place/SportsPhysio+Michalis+Sioulis+%CE%A6%CF%85%CF%83%CE%B9%CE%BA%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82+-+%CE%A7%CE%B5%CE%B9%CF%81%CE%BF%CE%B8%CE%B5%CF%81%CE%B1%CF%80%CE%B5%CF%85%CF%84%CE%AE%CF%82/@38.0635736,23.7635202,17z/data=!3m1!4b1!4m6!3m5!1s0x14a198a8a2813a6d:0xd9d5b39abdfa83ff!8m2!3d38.0635736!4d23.7660951!16s%2Fg%2F11g889688n";

export const Footer: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    "name": "Μιχάλης Σιούλης - Sports-Physio.gr",
    // Πραγματική φωτογραφία του θεραπευτή/χώρου — προτιμότερη από το λογότυπο
    // για το πεδίο `image` μιας τοπικής επιχείρησης (Google Business listing).
    "image": `${SITE_URL}/images/hero.webp`,
    "@id": `${SITE_URL}/#physiotherapy`,
    "url": SITE_URL,
    "telephone": "+302128488984",
    "email": "msioulis@yahoo.gr",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ιερού Λόχου 3",
      "addressLocality": "Μεταμόρφωση",
      "postalCode": "14451",
      "addressCountry": "GR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.0626,
      "longitude": 23.7486
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday", "Thursday"],
        "opens": "16:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Tuesday",
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      GOOGLE_BUSINESS_PROFILE_URL
    ]
  };

  return (
    <footer className="bg-ink-900 text-white/90 border-t border-white/5 py-12 md:py-16">
      {/* Inject JSON-LD Schema for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Column 1: Clinic Identity & Description */}
        <AnimatedContainer delay={0.1} className="flex flex-col gap-4">
          {/* Το logowhite.webp είναι λευκό λογότυπο «καμένο» πάνω σε συμπαγές
              μαύρο, χωρίς κανάλι alpha — στο σκούρο υποσέλιδο εμφανιζόταν ως
              μαύρο πλαίσιο. Το logo-white.png είναι η διορθωμένη εκδοχή με
              πραγματική διαφάνεια. */}
          {/* `self-start`: ο γονέας είναι `flex flex-col`, οπότε χωρίς αυτό το
              `align-items: stretch` τεντώνει την εικόνα σε όλο το πλάτος της
              στήλης και παραμορφώνει την αναλογία της. */}
          <Image src="/images/logo-white.png" alt="Sports-Physio.gr — Μιχάλης Σιούλης" width={216} height={144} className="h-12 md:h-14 w-auto self-start mb-3" />
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            Επιστημονικά τεκμηριωμένη φυσικοθεραπεία για πόνους, τραυματισμούς και αθλητική αποκατάσταση. Δίπλα σας σε κάθε βήμα της αποθεραπείας σας.
          </p>

          {/* Ορατοί σύνδεσμοι κοινωνικών δικτύων — ίδια URL με το `sameAs`
              του JSON-LD παραπάνω. */}
          <ul className="flex items-center gap-3" aria-label="Κοινωνικά δίκτυα">
            <li>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sports-Physio.gr στο Facebook (ανοίγει σε νέα καρτέλα)"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-primary hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sports-Physio.gr στο Instagram (ανοίγει σε νέα καρτέλα)"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-primary hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
                </svg>
              </a>
            </li>
          </ul>
        </AnimatedContainer>

        {/* Column 2: NAP & Contact Details */}
        <AnimatedContainer delay={0.2} className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
            Στοιχεία Επικοινωνίας
          </h3>
          <ul className="font-sans text-sm text-slate-400 flex flex-col gap-3">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary" aria-hidden="true">📍</span>
              <div>
                <strong className="text-white block font-medium">Διεύθυνση:</strong>
                <a
                  href="https://maps.google.com/?q=Ιερού+Λόχου+3,+Μεταμόρφωση+14451,+Αθήνα"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  Ιερού Λόχου 3, Μεταμόρφωση
                  <br />
                  Τ.Κ. 14451, Αθήνα
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%CE%99%CE%B5%CF%81%CE%BF%CF%8D+%CE%9B%CF%8C%CF%87%CE%BF%CF%85+3,+%CE%9C%CE%B5%CF%84%CE%B1%CE%BC%CF%8C%CF%81%CF%86%CF%89%CF%83%CE%B7+14451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-1 text-primary hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  Οδηγίες →
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary" aria-hidden="true">📞</span>
              <div>
                <strong className="text-white block font-medium">Τηλέφωνο:</strong>
                <a
                  href="tel:+302128488984"
                  className="hover:text-primary transition-colors text-base font-semibold focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  210 28 48 984
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary" aria-hidden="true">✉️</span>
              <div>
                <strong className="text-white block font-medium">Email:</strong>
                <a
                  href="mailto:msioulis@yahoo.gr"
                  className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  msioulis@yahoo.gr
                </a>
              </div>
            </li>
          </ul>
        </AnimatedContainer>

        {/* Column 3: Business Hours */}
        <AnimatedContainer delay={0.3} className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
            Ωράριο Λειτουργίας
          </h3>
          <ul className="font-sans text-sm text-slate-400 flex flex-col gap-2">
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Δευτέρα:</span>
              <span className="text-white font-medium text-right">09:00 - 13:00<br />16:00 - 20:00</span>
            </li>
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Τρίτη:</span>
              <span className="text-white font-medium text-right">09:00 - 20:00</span>
            </li>
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Τετάρτη:</span>
              <span className="text-white font-medium text-right">09:00 - 13:00<br />16:00 - 20:00</span>
            </li>
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Πέμπτη:</span>
              <span className="text-white font-medium text-right">09:00 - 13:00<br />16:00 - 20:00</span>
            </li>
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Παρασκευή:</span>
              <span className="text-white font-medium text-right">09:00 - 13:00</span>
            </li>
            <li className="flex justify-between gap-4 py-1 border-b border-white/5">
              <span>Σάββατο:</span>
              <span className="text-red-400 font-medium text-right">Κλειστά</span>
            </li>
            <li className="flex justify-between gap-4 py-1">
              <span>Κυριακή:</span>
              <span className="text-red-400 font-medium text-right">Κλειστά</span>
            </li>
          </ul>
        </AnimatedContainer>

        {/* Column 4: Links & Legals */}
        <AnimatedContainer delay={0.4} className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
            Χρήσιμοι Σύνδεσμοι
          </h3>
          <nav className="font-sans text-sm text-slate-400 flex flex-col gap-2" aria-label="Σύνδεσμοι υποσέλιδου">
            <Link
              href="/#ypiresies"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Υπηρεσίες
            </Link>
            <Link
              href="/#fysikotherapeia"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Φυσικοθεραπεία
            </Link>
            <Link
              href="/#gnoriste-me"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Γνωρίστε με
            </Link>
            <Link
              href="/politiki-aporritou"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5 mt-2"
            >
              Πολιτική Απορρήτου
            </Link>
          </nav>
        </AnimatedContainer>
      </div>

      {/* Legal and Copyright row */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans">
        <div>
          &copy; {new Date().getFullYear()} Sports-Physio.gr. Με επιφύλαξη παντός δικαιώματος.
        </div>
        {/* Τα στοιχεία ΑΦΜ/ΔΟΥ αφαιρέθηκαν: ήταν placeholder. Θα προστεθούν
            ξανά όταν είναι διαθέσιμα τα πραγματικά. */}
        <div>
          Μιχάλης Σιούλης • Φυσικοθεραπευτής
        </div>
      </div>
    </footer>
  );
};

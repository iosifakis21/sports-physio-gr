import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedContainer } from "@/components/AnimatedContainer";

export const Footer: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    "name": "Μιχάλης Σιούλης - Sports-Physio.gr",
    "image": "https://sports-physio.gr/images/hero-bg.jpg", // placeholder, updated in later phases
    "@id": "https://sports-physio.gr/#physiotherapy",
    "url": "https://sports-physio.gr",
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
      "https://www.facebook.com/michalis.sioulis.physio", // placeholder social links
      "https://www.instagram.com/michalis_sioulis"
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
          <Image src="/images/logowhite.webp" alt="Sports-Physio.gr — Μιχάλης Σιούλης" width={220} height={148} className="h-12 md:h-14 w-auto mb-3" />
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            Επιστημονικά τεκμηριωμένη φυσικοθεραπεία για πόνους, τραυματισμούς και αθλητική αποκατάσταση. Δίπλα σας σε κάθε βήμα της αποθεραπείας σας.
          </p>
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
        <div>
          Μιχάλης Σιούλης • Φυσικοθεραπευτής • ΑΦΜ: 123456789 • ΔΟΥ: Αμαρουσίου
        </div>
      </div>
    </footer>
  );
};

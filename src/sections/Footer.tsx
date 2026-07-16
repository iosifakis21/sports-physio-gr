import React from "react";
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
    "telephone": "+302101234567",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Λεωφόρος Κηφισίας 123",
      "addressLocality": "Αθήνα",
      "postalCode": "11524",
      "addressCountry": "GR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9838, // approximate placeholder coordinates
      "longitude": 23.7275
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
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
          <Image src="/images/logo-white.png" alt="Sports-Physio.gr — Μιχάλης Σιούλης" width={180} height={121} className="h-10 md:h-12 w-auto mb-3" />
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-8 h-8 text-primary"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white">
              Sports-Physio<span className="text-primary">.gr</span>
            </span>
          </div>
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
                  href="https://maps.google.com/?q=Λεωφόρος+Κηφισίας+123,+Αθήνα+11524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  Λεωφόρος Κηφισίας 123, Αθήνα, 115 24
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary" aria-hidden="true">📞</span>
              <div>
                <strong className="text-white block font-medium">Τηλέφωνο:</strong>
                <a
                  href="tel:+302101234567"
                  className="hover:text-primary transition-colors text-base font-semibold focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  +30 210 1234567
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary" aria-hidden="true">✉️</span>
              <div>
                <strong className="text-white block font-medium">Email:</strong>
                <a
                  href="mailto:info@sports-physio.gr"
                  className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
                >
                  info@sports-physio.gr
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
            <li className="flex justify-between py-1 border-b border-white/5">
              <span>Δευτέρα - Παρασκευή:</span>
              <span className="text-white font-medium">09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 border-b border-white/5">
              <span>Σάββατο:</span>
              <span className="text-white font-medium">09:00 - 14:00</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Κυριακή:</span>
              <span className="text-red-400 font-medium">Κλειστά</span>
            </li>
          </ul>
        </AnimatedContainer>

        {/* Column 4: Links & Legals */}
        <AnimatedContainer delay={0.4} className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
            Χρήσιμοι Σύνδεσμοι
          </h3>
          <nav className="font-sans text-sm text-slate-400 flex flex-col gap-2" aria-label="Σύνδεσμοι υποσέλιδου">
            <a
              href="#ypiresies"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Υπηρεσίες
            </a>
            <a
              href="#physikotherapeia"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Φυσικοθεραπεία
            </a>
            <a
              href="#gnoriste-me"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5"
            >
              Γνωρίστε με
            </a>
            <a
              href="/politiki-aporritou"
              className="hover:text-primary transition-colors focus:outline focus:outline-2 focus:outline-primary rounded p-0.5 mt-2"
            >
              Πολιτική Απορρήτου
            </a>
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

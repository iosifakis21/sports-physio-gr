"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedContainer } from "@/components/AnimatedContainer";

/**
 * Η κάρτα μιας υπηρεσίας — φωτογραφία σε πλήρη κάλυψη, αριθμός (01–07), τίτλος
 * και περιγραφή. Χρησιμοποιείται τόσο από την ενότητα «Υπηρεσίες» της αρχικής
 * (`src/sections/Services.tsx`) όσο και από τη σελίδα-κόμβο `/ypiresies`, ώστε
 * η εμφάνιση να είναι ίδια και στα δύο σημεία.
 */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  photo: string;
  /** Slug of the service's own page — see src/content/service-pages/ */
  slug: string;
}

const ArrowIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

export const ServiceCard: React.FC<{ service: ServiceItem; index: number }> = ({
  service,
  index,
}) => {
  const [imgError, setImgError] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/ypiresies/${service.slug}`}
      aria-label={`${service.title} — μάθετε περισσότερα`}
      className="group relative block aspect-[3/4] lg:aspect-[4/3.85] w-full overflow-hidden rounded-card bg-ink-900 select-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
    >
      {/* Full-bleed photo, with a solid ink-900 fallback if the file is missing */}
      {!imgError && (
        <Image
          src={service.photo}
          alt={service.title}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      )}

      {/* Bottom gradient so title/description stay legible over the photo */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 lg:h-3/5 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Large faint index number, top-left */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 md:top-5 md:left-5 lg:top-4 lg:left-4 font-display font-light text-3xl md:text-5xl lg:text-4xl text-white/30 leading-none"
      >
        {number}
      </span>

      {/* Decorative arrow button, top-right */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 md:top-5 md:right-5 lg:top-4 lg:right-4 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-full bg-white/15 backdrop-blur-sm text-white transition-colors duration-200 md:group-hover:bg-white/25"
      >
        <ArrowIcon />
      </span>

      {/* Title + description, overlaid bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 lg:p-4 flex flex-col gap-1 md:gap-2 lg:gap-1">
        <h3 className="font-display font-bold uppercase text-white text-sm leading-tight tracking-tight md:text-xl lg:text-base">
          {service.title}
        </h3>
        <p className="font-sans font-light text-white/80 text-[11px] leading-snug line-clamp-2 md:text-sm md:leading-relaxed md:line-clamp-3 lg:text-xs lg:leading-snug lg:line-clamp-2">
          {service.description}
        </p>
        {/* Affordance making it obvious the whole card is a link */}
        <span className="mt-1 inline-flex items-center gap-1 font-sans font-semibold text-white text-[11px] md:text-sm lg:text-xs underline underline-offset-4 decoration-white/40 md:group-hover:decoration-white transition-colors">
          Μάθετε περισσότερα
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
};

/**
 * Το πλέγμα των καρτών, με την ίδια σταδιακή εμφάνιση — 2 στήλες σε
 * κινητό/tablet, 3 σε desktop. Ίδιο πλέγμα στην αρχική και στη `/ypiresies`.
 */
export const ServiceCardGrid: React.FC<{ services: ServiceItem[] }> = ({ services }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
    {services.map((service, index) => (
      <AnimatedContainer
        key={service.id}
        delay={index * 0.1}
        initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
      >
        <ServiceCard service={service} index={index} />
      </AnimatedContainer>
    ))}
  </div>
);

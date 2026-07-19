"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import servicesData from "@/content/services.json";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  photo: string;
}

const ArrowIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-3.5 h-3.5 md:w-4 md:h-4"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

const ServiceCard: React.FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
  const [imgError, setImgError] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-card bg-ink-900 select-none">
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
        className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Large faint index number, top-left */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 md:top-5 md:left-5 font-display font-light text-3xl md:text-5xl text-white/30 leading-none"
      >
        {number}
      </span>

      {/* Decorative arrow button, top-right */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 md:top-5 md:right-5 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/15 backdrop-blur-sm text-white transition-colors duration-200 md:group-hover:bg-white/25"
      >
        <ArrowIcon />
      </span>

      {/* Title + description, overlaid bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 flex flex-col gap-1 md:gap-2">
        <h3 className="font-display font-bold uppercase text-white text-sm leading-tight tracking-tight md:text-xl">
          {service.title}
        </h3>
        <p className="font-sans font-light text-white/80 text-[11px] leading-snug line-clamp-2 md:text-sm md:leading-relaxed md:line-clamp-3">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const servicesList: ServiceItem[] = servicesData as ServiceItem[];

  return (
    <section id="ypiresies" className="py-[56px] md:py-[96px] bg-surface select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-12 md:gap-16">

        {/* Section Title */}
        <SectionHeading
          eyebrow="Υπηρεσίες"
          heading="Εξειδικευμένες Υπηρεσίες Φυσικοθεραπείας"
          subcopy="Θεραπείες σχεδιασμένες με βάση τις δικές σας ανάγκες και τις τελευταίες επιστημονικές εξελίξεις."
        />

        {/* 2-col mobile / 2-col tablet / 3-col desktop grid of full-bleed photo cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
          {servicesList.map((service, index) => (
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

      </div>
    </section>
  );
};

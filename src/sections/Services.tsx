"use client";

import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCardGrid, type ServiceItem } from "@/components/ServiceCard";
import servicesData from "@/content/services.json";

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
        <ServiceCardGrid services={servicesList} />

      </div>
    </section>
  );
};

import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import servicesData from "@/content/services.json";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

// Icon rendering helper
const renderIcon = (iconName: string) => {
  const baseStyles = "w-6 h-6";
  switch (iconName) {
    case "activity":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "trophy":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-5.75c-.622 0-1.125.504-1.125 1.125v3.375m9 0H7.5" />
        </svg>
      );
    case "shield-check":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.188.904zM19.006 5.005l-.505 2.5-.504-2.5-2.5-.505 2.5-.504.504-2.5.505 2.5 2.5.504-2.5.505z" />
        </svg>
      );
    case "heart":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      );
    case "bookmark":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={baseStyles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      );
  }
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

        {/* 3-column / 1-column responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, index) => (
            <AnimatedContainer
              key={service.id}
              className="h-full"
              delay={index * 0.1}
              initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
            >
              <Card className="h-full" icon={renderIcon(service.iconName)}>
                <h3 className="font-display font-bold text-lg md:text-xl text-ink-900 leading-tight">
                  {service.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed mt-2">
                  {service.description}
                </p>
              </Card>
            </AnimatedContainer>
          ))}
        </div>

      </div>
    </section>
  );
};

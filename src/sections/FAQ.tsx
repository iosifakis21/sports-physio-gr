import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import faqData from "@/content/faq.json";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqs: FAQItem[] = faqData as FAQItem[];

  // Construct structured data for FAQPage SEO schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-[56px] md:py-[96px] bg-surface select-none scroll-mt-20">
      {/* Inject Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-16 items-center">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Συχνές Ερωτήσεις"
          heading="Απαντάμε στις Απορίες Σας"
          subcopy="Βρείτε απαντήσεις σε συχνά ερωτήματα σχετικά με τις συνεδρίες, το κόστος, την κάλυψη ασφαλειών και τη διαδικασία."
        />

        {/* Styled details/summary Accordion container */}
        <div className="w-full max-w-[800px] flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              name="faq-accordion" // Enforces "one open at a time" native browser accordion behavior
              className="group bg-surface-alt border border-ink-900/5 rounded-card overflow-hidden transition-all duration-200 open:shadow-sm"
            >
              <summary
                className="flex items-center justify-between p-5 font-display font-bold text-base md:text-lg text-ink-900 cursor-pointer list-none select-none hover:bg-ink-900/5 focus:outline focus:outline-2 focus:outline-primary transition-colors [&::-webkit-details-marker]:hidden"
                aria-label={faq.question}
              >
                <span>{faq.question}</span>
                <span className="text-primary group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4 font-mono font-normal">
                  ▼
                </span>
              </summary>
              <div className="p-5 pt-0 font-sans text-sm md:text-base text-ink-600 leading-relaxed border-t border-ink-900/5">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};

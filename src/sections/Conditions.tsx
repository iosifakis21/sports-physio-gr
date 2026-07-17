import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { ConditionsAnnotatedPhoto } from "@/components/ConditionsAnnotatedPhoto";
import conditionsData from "@/content/conditions.json";

interface ConditionGroup {
  id: string;
  areaTitle: string;
  items: string[];
}

export const Conditions: React.FC = () => {
  const groups: ConditionGroup[] = conditionsData as ConditionGroup[];

  return (
    <section id="fysikotherapeia" className="py-[56px] md:py-[96px] bg-surface-alt border-y border-ink-900/5 select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-12 md:gap-16">

        {/* Interactive annotated-photo block (new) */}
        <ConditionsAnnotatedPhoto />

        {/* Section Title */}
        <SectionHeading
          eyebrow="Παθήσεις"
          heading="Παθήσεις & Τραυματισμοί που Αντιμετωπίζουμε"
          subcopy="Εξειδικευμένα προγράμματα φυσικοθεραπείας προσαρμοσμένα στις δικές σας ανάγκες για αποτελεσματική αποθεραπεία."
        />

        {/* 2-column layout for the groups on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
          {groups.map((group, index) => (
            <AnimatedContainer
              key={group.id}
              className="h-full"
              delay={index * 0.1}
              initial={{ opacity: 0, translateY: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
            >
              <div className="h-full bg-surface rounded-card p-6 md:p-8 border border-ink-900/5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-display font-bold text-lg md:text-xl text-ink-900 border-b border-ink-900/10 pb-3 mb-4 flex items-center gap-2">
                  <span className="text-primary font-normal text-base select-none">🔵</span>
                  {group.areaTitle}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((item, itemIndex) => (
                    <CheckItem key={itemIndex} text={item} />
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>

      </div>
    </section>
  );
};

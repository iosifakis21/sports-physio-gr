import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CheckItem } from "@/components/CheckItem";
import { JsonLd } from "@/components/JsonLd";
import { buildConditionGraph } from "@/lib/schema";
import { servicePageHref } from "@/content/service-pages";
import servicesData from "@/content/services.json";
import type { ConditionPageContent } from "@/content/condition-pages/types";

const CalendarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

/**
 * Shared layout for every `/pathiseis/[slug]` page — the conditions counterpart
 * of `ServicePageTemplate`. All copy comes from the condition's own content
 * file in `src/content/condition-pages/`.
 */
export const ConditionPageTemplate: React.FC<{ content: ConditionPageContent }> = ({
  content,
}) => {
  const { hero, whatIs, symptoms, howWeHelp } = content;

  // Οι σχετικές υπηρεσίες, με τον τίτλο τους από το `services.json` όταν το
  // αρχείο περιεχομένου δεν δίνει δικό του `label`. Υπηρεσίες που δεν υπάρχουν
  // στο `services.json` απορρίπτονται, ώστε να μη βγει ποτέ σπασμένος σύνδεσμος.
  const relatedServices = howWeHelp.relatedServices
    .map((related) => {
      const service = servicesData.find((item) => item.slug === related.slug);
      if (!service) return null;
      return { slug: related.slug, label: related.label ?? service.title };
    })
    .filter((item): item is { slug: string; label: string } => item !== null);

  return (
    <article className="flex flex-col w-full">
      {/* Ένα ενιαίο `@graph`: επιχείρηση, ιστότοπος, θεραπευτής, οι υπηρεσίες,
          η διαδρομή πλοήγησης και η ίδια η πάθηση (MedicalCondition). */}
      <JsonLd data={buildConditionGraph(content)} />

      {/* ---------- Page hero: όνομα πάθησης + σύντομη εισαγωγή ---------- */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-ink-900 to-ink-900"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 flex flex-col gap-4 md:gap-5">
          <nav
            aria-label="Διαδρομή πλοήγησης"
            className="font-sans text-xs md:text-sm text-slate-400 flex items-center gap-2 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
            >
              Αρχική
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/pathiseis"
              className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
            >
              Παθήσεις
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-300">{content.name}</span>
          </nav>

          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            {hero.title}
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {hero.intro}
          </p>

          <div className="mt-2">
            <Button
              variant="primary"
              label="Κλείστε Ραντεβού"
              href="/#kleiste-rantevou"
              icon={<CalendarIcon />}
            />
          </div>
        </div>
      </section>

      {/* ---------- Τι Είναι ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight">
            Τι Είναι
          </h2>
          {whatIs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg text-ink-600 font-sans leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- Συμπτώματα ---------- */}
      {symptoms.length > 0 && (
        <section className="py-[56px] md:py-[96px] bg-surface-alt border-t border-ink-900/5">
          <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-6 md:gap-8">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight">
              Συμπτώματα
            </h2>
            <div className="flex flex-col gap-3">
              {symptoms.map((symptom) => (
                <CheckItem key={symptom} text={symptom} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Πώς Βοηθάμε ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight">
            Πώς Βοηθάμε
          </h2>
          {howWeHelp.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg text-ink-600 font-sans leading-relaxed"
            >
              {paragraph}
            </p>
          ))}

          {relatedServices.length > 0 && (
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="font-display font-bold text-lg text-ink-900">
                Σχετικές υπηρεσίες
              </h3>
              <ul className="flex flex-col gap-2">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePageHref(service.slug)}
                      className="font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
                    >
                      {service.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Booking CTA ---------- */}
      <section className="py-[56px] md:py-[96px] bg-primary text-white select-none">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col items-center text-center gap-5">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight">
            Έτοιμοι να ξεκινήσετε;
          </h2>
          <p className="font-sans text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
            Κλείστε το ραντεβού σας σε λιγότερο από 1 λεπτό και ξεκινήστε την
            αποκατάστασή σας με εξατομικευμένο πλάνο.
          </p>
          <Button
            variant="secondary"
            label="Κλείστε Ραντεβού"
            href="/#kleiste-rantevou"
            className="mt-2 font-semibold"
            icon={<CalendarIcon />}
          />
        </div>
      </section>
    </article>
  );
};

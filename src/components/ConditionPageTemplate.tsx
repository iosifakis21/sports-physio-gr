import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { InlineBookingCalendar } from "@/components/InlineBookingCalendar";
import { CheckItem } from "@/components/CheckItem";
import { JsonLd } from "@/components/JsonLd";
import { buildConditionGraph } from "@/lib/schema";
import { ServiceCardGrid, type ServiceItem } from "@/components/ServiceCard";
import servicesData from "@/content/services.json";
import type {
  ConditionBlock,
  ConditionPageContent,
} from "@/content/condition-pages/types";

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
 * Ένα μπλοκ περιεχομένου: παράγραφος, υπο-επικεφαλίδα, λίστα ή πίνακας. Έτσι
 * το κείμενο του παλιού sports-physio.gr μεταφέρεται αυτούσιο, με τη δομή του.
 */
const Block: React.FC<{ block: ConditionBlock }> = ({ block }) => {
  if (typeof block === "string" || block.kind === "paragraph") {
    return (
      <p className="text-base md:text-lg text-ink-600 font-sans leading-relaxed">
        {typeof block === "string" ? block : block.text}
      </p>
    );
  }

  if (block.kind === "heading") {
    return (
      <h3 className="font-display font-bold text-lg md:text-xl text-ink-900 mt-2">
        {block.text}
      </h3>
    );
  }

  if (block.kind === "list") {
    return (
      <ul
        className={`flex flex-col gap-2 text-base md:text-lg text-ink-600 font-sans leading-relaxed ${
          block.marker === "none" ? "" : "list-disc pl-5 md:pl-6"
        }`}
      >
        {block.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  // Πίνακας δύο στηλών — σε στενές οθόνες κυλάει οριζόντια μέσα στο πλαίσιό
  // του, ώστε να μη «σπρώχνει» ποτέ όλη τη σελίδα.
  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <table className="w-full min-w-[320px] border-collapse font-sans text-base md:text-lg">
        {block.head && (
          <thead>
            <tr className="border-b border-ink-900/15">
              <th className="text-left font-display font-bold text-ink-900 py-2 pr-4">
                {block.head[0]}
              </th>
              <th className="text-right font-display font-bold text-ink-900 py-2">
                {block.head[1]}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows.map(([label, value], index) => (
            <tr key={index} className="border-b border-ink-900/5">
              <td className="text-ink-600 py-2 pr-4 leading-relaxed">{label}</td>
              <td className="text-ink-900 font-semibold py-2 text-right whitespace-nowrap align-top">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Shared layout for every `/pathiseis/[slug]` page — the conditions counterpart
 * of `ServicePageTemplate`. All copy comes from the condition's own content
 * file in `src/content/condition-pages/`.
 */
export const ConditionPageTemplate: React.FC<{ content: ConditionPageContent }> = ({
  content,
}) => {
  const { hero, whatIs, symptoms, howWeHelp } = content;

  // Οι σχετικές υπηρεσίες, ως ολόκληρες κάρτες από το `services.json` — ίδιες
  // με τις κάρτες της αρχικής και της `/ypiresies`. Ένα `label` στο αρχείο
  // περιεχομένου αντικαθιστά τον τίτλο της κάρτας. Υπηρεσίες που δεν υπάρχουν
  // στο `services.json` απορρίπτονται, ώστε να μη βγει ποτέ σπασμένη κάρτα.
  const services = servicesData as ServiceItem[];
  const relatedServices = howWeHelp.relatedServices
    .map((related) => {
      const service = services.find((item) => item.slug === related.slug);
      if (!service) return null;
      return related.label ? { ...service, title: related.label } : service;
    })
    .filter((item): item is ServiceItem => item !== null);

  // Ο αριθμός της κάρτας μένει ο κανονικός αριθμός της υπηρεσίας (01–07), όχι
  // η θέση της μέσα στις σχετικές υπηρεσίες αυτής της πάθησης.
  const relatedServiceIndexes = relatedServices.map((related) =>
    services.findIndex((item) => item.slug === related.slug)
  );

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
              calPopup
              href="#kleiste-rantevou"
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
          {whatIs.map((block, index) => (
            <Block key={index} block={block} />
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
            {/* Σύμπτωμα-σύμπτωμα με ✓ όταν η πηγή έχει λίστα· παράγραφοι όταν
                η πηγή τα περιγράφει σε κείμενο. */}
            <div className="flex flex-col gap-3">
              {symptoms.map((symptom, index) =>
                typeof symptom === "string" ? (
                  <CheckItem key={index} text={symptom} />
                ) : (
                  <Block key={index} block={symptom} />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Πώς Βοηθάμε ----------
           Η επικεφαλίδα μπαίνει μόνο όταν υπάρχει κείμενο από κάτω: μερικές
           σελίδες του παλιού site δεν έχουν καθόλου ενότητα θεραπείας, οπότε
           μένουν μόνο οι σχετικές υπηρεσίες. */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        {howWeHelp.paragraphs.length > 0 && (
          <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight">
              Πώς Βοηθάμε
            </h2>
            {howWeHelp.paragraphs.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        )}

        {/* Οι σχετικές υπηρεσίες ως κάρτες με φωτογραφία — έξω από τη στήλη
            κειμένου των 800px, στο κανονικό πλάτος του πλέγματος, ώστε οι
            κάρτες να είναι ίδιες με της αρχικής και της `/ypiresies`. */}
        {relatedServices.length > 0 && (
          <div
            className={`max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-5 md:gap-6 ${
              howWeHelp.paragraphs.length > 0 ? "mt-10 md:mt-14" : ""
            }`}
          >
            <h3 className="font-display font-bold text-xl md:text-2xl text-ink-900">
              Σχετικές υπηρεσίες
            </h3>
            <ServiceCardGrid
              services={relatedServices}
              indexes={relatedServiceIndexes}
            />
          </div>
        )}
      </section>

      {/* ---------- Inline booking calendar ----------
           Replaces the old CTA section that linked back to the homepage: the
           calendar now lives on this page, so there is nowhere to send people.
           It also owns the `kleiste-rantevou` anchor this page's CTAs fall
           back to when the Cal.com popup script is unavailable. */}
      <InlineBookingCalendar />
    </article>
  );
};

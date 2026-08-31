import fs from "node:fs";
import path from "node:path";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CheckItem } from "@/components/CheckItem";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceGraph } from "@/lib/schema";
import conditionsData from "@/content/conditions.json";
import type { ServicePageContent } from "@/content/service-pages/types";

interface ConditionGroup {
  id: string;
  areaTitle: string;
  items: string[];
}

/**
 * Whether a service's hero photo has actually been supplied yet. Services
 * awaiting their real photo point at a path under `public/images/services/`
 * that does not exist, and next/image has no fallback of its own — it would
 * render the browser's broken-image glyph in the middle of the hero. This runs
 * at build time (the template is a server component and every service page is
 * prerendered), so a page simply drops the image until the file is added, and
 * picks it up automatically once it is.
 */
const heroPhotoExists = (photo: string): boolean => {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", photo));
  } catch {
    return false;
  }
};

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

/** Renders one rich-content block from a service's content file. */
const BodyBlock: React.FC<{ block: ServicePageContent["body"][number] }> = ({ block }) => {
  if (block.type === "heading") {
    return (
      <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900 tracking-tight mt-4">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc pl-5 flex flex-col gap-2 text-base text-ink-600 font-sans leading-relaxed">
        {block.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-base md:text-lg text-ink-600 font-sans leading-relaxed">
      {block.text}
    </p>
  );
};

/**
 * Shared layout for every `/ypiresies/[slug]` page. All copy comes from the
 * service's own content file in `src/content/service-pages/` — the optional
 * related-conditions and FAQ sections simply don't render when a service
 * leaves them out.
 */
export const ServicePageTemplate: React.FC<{ content: ServicePageContent }> = ({ content }) => {
  const { hero, body, relatedConditions, faq } = content;

  const conditionGroups = (conditionsData as ConditionGroup[]).filter((group) =>
    (relatedConditions ?? []).includes(group.id)
  );
  const hasFaq = Boolean(faq && faq.length > 0);
  const hasHeroPhoto = heroPhotoExists(hero.photo);

  return (
    <article className="flex flex-col w-full">
      {/* Ένα και μοναδικό `@graph` για όλη τη σελίδα: επιχείρηση, ιστότοπος,
          θεραπευτής, οι υπηρεσίες, η διαδρομή πλοήγησης και το FAQ της
          σελίδας (αν υπάρχει). Βλ. `src/lib/schema.ts`. */}
      <JsonLd data={buildServiceGraph(content)} />

      {/* ---------- Page header: title, intro, photo ---------- */}
      <section className="relative bg-ink-900 text-white overflow-hidden">
        {/* Brand-blue wash, same dark-to-blue language as the homepage hero */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-ink-900 to-ink-900"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Copy column */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Breadcrumb — always absolute paths so they work off the homepage */}
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
                href="/ypiresies"
                className="hover:text-white transition-colors focus:outline focus:outline-2 focus:outline-primary rounded"
              >
                Υπηρεσίες
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">{hero.title}</span>
            </nav>

            <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
              {hero.title}
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
              {hero.intro}
            </p>

            <div className="mt-2">
              <Button
                variant="primary"
                label="Κλείστε Ραντεβού"
                calPopup
                href="/#kleiste-rantevou"
                icon={<CalendarIcon />}
              />
            </div>
          </div>

          {/* Photo column — full-width above the copy on mobile, beside it on desktop */}
          <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-card overflow-hidden ring-1 ring-white/10 shadow-2xl order-first lg:order-last bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            {hasHeroPhoto && (
              <Image
                src={hero.photo}
                alt={hero.title}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* ---------- Main body copy ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-5">
          {body.map((block, index) => (
            <BodyBlock key={index} block={block} />
          ))}
        </div>
      </section>

      {/* ---------- Optional: related conditions ---------- */}
      {conditionGroups.length > 0 && (
        <section className="py-[56px] md:py-[96px] bg-surface-alt border-t border-ink-900/5">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display">
                Σχετικές Παθήσεις
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900 font-display tracking-tight">
                Πότε βοηθά αυτή η υπηρεσία
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {conditionGroups.map((group) => (
                <AnimatedContainer
                  key={group.id}
                  className="bg-surface p-6 rounded-card border border-ink-900/5 flex flex-col gap-4"
                >
                  <h3 className="font-display font-bold text-lg text-ink-900">
                    {group.areaTitle}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            <Link
              href="/#fysikotherapeia"
              className="font-sans font-semibold text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded self-start"
            >
              Δείτε όλες τις παθήσεις που αντιμετωπίζουμε →
            </Link>
          </div>
        </section>
      )}

      {/* ---------- Optional: service-specific FAQ ---------- */}
      {hasFaq && (
        <section className="py-[56px] md:py-[96px] bg-surface">
          <div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wider uppercase text-primary font-display">
                Συχνές Ερωτήσεις
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900 font-display tracking-tight">
                Ό,τι χρειάζεται να ξέρετε
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faq!.map((item, index) => (
                <details
                  key={index}
                  name="service-faq-accordion"
                  className="group bg-surface-alt border border-ink-900/5 rounded-card overflow-hidden transition-all duration-200 open:shadow-sm"
                >
                  <summary className="flex items-center justify-between p-5 font-display font-bold text-base md:text-lg text-ink-900 cursor-pointer list-none select-none hover:bg-ink-900/5 focus:outline focus:outline-2 focus:outline-primary transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="text-primary group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4 font-mono font-normal">
                      ▼
                    </span>
                  </summary>
                  <div className="p-5 pt-0 font-sans border-t border-ink-900/5">
                    <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Booking CTA (links back to the homepage booking form) ---------- */}
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
            calPopup
            href="/#kleiste-rantevou"
            className="mt-2 font-semibold"
            icon={<CalendarIcon />}
          />
        </div>
      </section>
    </article>
  );
};

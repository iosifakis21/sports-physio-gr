import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildConditionsHubGraph } from "@/lib/schema";
import {
  CONDITIONS_HUB_PATH,
  conditionCategories,
  conditionPageHref,
  conditionPagesByCategory,
} from "@/content/condition-pages";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Παθήσεις | Sports-Physio.gr — Μιχάλης Σιούλης";
const DESCRIPTION =
  "Όλες οι παθήσεις που αντιμετωπίζουμε στο Sports-Physio.gr: σπονδυλική στήλη, γόνατο, ώμος, ποδοκνημική, αγκώνας, ισχίο και άκρα χείρα.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CONDITIONS_HUB_PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CONDITIONS_HUB_PATH,
    siteName: SITE_NAME,
    locale: "el_GR",
    type: "website",
  },
};

export default function Page() {
  return (
    <article className="flex flex-col w-full">
      <JsonLd data={buildConditionsHubGraph()} />

      {/* ---------- Page header ---------- */}
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
            <span className="text-slate-300">Παθήσεις</span>
          </nav>

          <span className="text-sm font-semibold tracking-wider uppercase text-white/70 font-display">
            Παθήσεις
          </span>

          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Παθήσεις που Αντιμετωπίζουμε
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Είκοσι μία παθήσεις σε επτά κατηγορίες — επιλέξτε μια πάθηση για να
            δείτε τι είναι, ποια είναι τα συμπτώματά της και πώς την
            αντιμετωπίζουμε.
          </p>
        </div>
      </section>

      {/* ---------- Οι επτά κατηγορίες ---------- */}
      <section className="py-[56px] md:py-[96px] bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {conditionCategories.map((category) => {
            const pages = conditionPagesByCategory(category.id);
            if (pages.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-surface-alt p-6 rounded-card border border-ink-900/5 flex flex-col gap-4"
              >
                <h2 className="font-display font-bold text-lg md:text-xl text-ink-900">
                  {category.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={conditionPageHref(page.slug)}
                        className="font-sans text-base text-primary-link hover:underline focus:outline focus:outline-2 focus:outline-primary rounded"
                      >
                        {page.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import type { ServicePageContent } from "./types";
import { manualTherapyPage } from "./manual-therapy";
import { athlitikiApokatastasiPage } from "./athlitiki-apokatastasi";
import { metegxeiritikiApokatastasiPage } from "./metegxeiritiki-apokatastasi";
import { dryNeedlingPage } from "./dry-needling";
import { therapeftikiMalaxiPage } from "./therapeftiki-malaxi";
import { kinesiotapingPage } from "./kinesiotaping";

export const SITE_URL = "https://sports-physio.gr";
const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/** Όλες οι σελίδες υπηρεσιών, με τη σειρά που εμφανίζονται στην αρχική. */
export const servicePages: ServicePageContent[] = [
  manualTherapyPage,
  athlitikiApokatastasiPage,
  metegxeiritikiApokatastasiPage,
  dryNeedlingPage,
  therapeftikiMalaxiPage,
  kinesiotapingPage,
];

/** Το URL μιας σελίδας υπηρεσίας, π.χ. "/ypiresies/manual-therapy". */
export const servicePageHref = (slug: string) => `/ypiresies/${slug}`;

/**
 * Χτίζει τα SEO metadata μιας σελίδας υπηρεσίας, με τη λογική τίτλου/canonical
 * που χρησιμοποιεί ήδη η αρχική σελίδα (βλ. `src/app/layout.tsx`).
 */
export function buildServiceMetadata(content: ServicePageContent): Metadata {
  const title = `${content.meta.title} | ${SITE_NAME_SUFFIX}`;
  const url = `${SITE_URL}${servicePageHref(content.slug)}`;

  return {
    title,
    description: content.meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: content.meta.description,
      url,
      siteName: "Sports-Physio.gr",
      locale: "el_GR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}${content.hero.photo}`,
          alt: content.hero.title,
        },
      ],
    },
  };
}

export type { ServicePageContent } from "./types";

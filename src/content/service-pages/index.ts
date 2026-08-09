import type { Metadata } from "next";
import type { ServicePageContent } from "./types";
import { SITE_NAME } from "@/lib/site";
import { manualTherapyPage } from "./manual-therapy";
import { medicalTrainingTherapyPage } from "./medical-training-therapy";
import { kroustikosYperichosPage } from "./kroustikos-yperichos";
import { pelmatografosPage } from "./pelmatografos";
import { dryNeedlingPage } from "./dry-needling";
import { kinesiotapingPage } from "./kinesiotaping";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/** Όλες οι σελίδες υπηρεσιών, με τη σειρά που εμφανίζονται στην αρχική. */
export const servicePages: ServicePageContent[] = [
  manualTherapyPage,
  medicalTrainingTherapyPage,
  kroustikosYperichosPage,
  pelmatografosPage,
  dryNeedlingPage,
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
  // Σχετικές διαδρομές: αναλύονται σε απόλυτα URL μέσω του `metadataBase`
  // που ορίζεται στο root layout (βλ. `src/app/layout.tsx`).
  const url = servicePageHref(content.slug);

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
      siteName: SITE_NAME,
      locale: "el_GR",
      type: "article",
      images: [
        {
          url: content.hero.photo,
          alt: content.hero.title,
        },
      ],
    },
  };
}

export type { ServicePageContent } from "./types";

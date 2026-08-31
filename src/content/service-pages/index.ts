import type { Metadata } from "next";
import type { ServicePageContent } from "./types";
import { SITE_NAME } from "@/lib/site";
import { manualTherapyPage } from "./manual-therapy";
import { medicalTrainingTherapyPage } from "./medical-training-therapy";
import { kroustikosYperichosPage } from "./kroustikos-yperichos";
import { pelmatografosPage } from "./pelmatografos";
import { dryNeedlingPage } from "./dry-needling";
import { kinesiotapingPage } from "./kinesiotaping";
import { tecarTPlusPage } from "./tecar-t-plus";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/** Όλες οι σελίδες υπηρεσιών, με τη σειρά που εμφανίζονται στην αρχική. */
export const servicePages: ServicePageContent[] = [
  manualTherapyPage,
  medicalTrainingTherapyPage,
  kroustikosYperichosPage,
  pelmatografosPage,
  dryNeedlingPage,
  kinesiotapingPage,
  tecarTPlusPage,
];

/** Η σελίδα-κόμβος με όλες τις υπηρεσίες (βλ. `src/app/ypiresies/page.tsx`). */
export const SERVICES_HUB_PATH = "/ypiresies";

/** Το URL μιας σελίδας υπηρεσίας, π.χ. "/ypiresies/manual-therapy". */
export const servicePageHref = (slug: string) => `${SERVICES_HUB_PATH}/${slug}`;

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
      // Καμία ρητή `images` εδώ: κάθε σελίδα υπηρεσίας έχει το δικό της
      // `opengraph-image.tsx`, που παράγει PNG με το όνομα της υπηρεσίας. Οι
      // παλιές .webp φωτογραφίες αφαιρέθηκαν επειδή ο scraper του Facebook δεν
      // τις διαβάζει αξιόπιστα — και μια ρητή τιμή εδώ θα υπερίσχυε του αρχείου.
    },
  };
}

export type { ServicePageContent } from "./types";

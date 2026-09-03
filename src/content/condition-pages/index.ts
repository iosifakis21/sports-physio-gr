import type { Metadata } from "next";
import type { ConditionPageContent } from "./types";
import { SITE_NAME } from "@/lib/site";
import { conditionCategories } from "./categories";
import { aychenikonSyndromoPage } from "./aychenikon-syndromo";
import { ierolagonitidaPage } from "./ierolagonitida";
import { kiliMesospondylioyDiskoyPage } from "./kili-mesospondylioy-diskoy";
import { kyfosiPage } from "./kyfosi";
import { osfyalgiaPage } from "./osfyalgia";
import { skoliosiPage } from "./skoliosi";
import { spondyloarthropatheiaPage } from "./spondyloarthropatheia";
import { spondylolisthisiPage } from "./spondylolisthisi";
import { spondylolysiPage } from "./spondylolysi";
import { syndromoThorakikisExodoyPage } from "./syndromo-thorakikis-exodoy";
import { miniskoiPage } from "./miniskoi";
import { prosthiosChiastosSyndesmosPage } from "./prosthios-chiastos-syndesmos";
import { tenontopatheiaEpigonatidikoyTenontaPage } from "./tenontopatheia-epigonatidikoy-tenonta";
import { syndromoProskroysisYpakromiakisProstrivisPage } from "./syndromo-proskroysis-ypakromiakis-prostrivis";
import { diastremmaPodoknimikisPage } from "./diastremma-podoknimikis";
import { pelmatiaiaAponeyrositidaPage } from "./pelmatiaia-aponeyrositida";
import { rixiAchilleioyTenontaPage } from "./rixi-achilleioy-tenonta";
import { epikondylitidaPage } from "./epikondylitida";
import { arthroplastikiIschioyPage } from "./arthroplastiki-ischioy";
import { stenotikiTenontoelytritidaDeQuervainPage } from "./stenotiki-tenontoelytritida-de-quervain";
import { syndromoKarpiaioySolinaPage } from "./syndromo-karpiaioy-solina";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/** Όλες οι σελίδες παθήσεων, ομαδοποιημένες ανά κατηγορία (βλ. `categories.ts`). */
export const conditionPages: ConditionPageContent[] = [
  aychenikonSyndromoPage,
  ierolagonitidaPage,
  kiliMesospondylioyDiskoyPage,
  kyfosiPage,
  osfyalgiaPage,
  skoliosiPage,
  spondyloarthropatheiaPage,
  spondylolisthisiPage,
  spondylolysiPage,
  syndromoThorakikisExodoyPage,
  miniskoiPage,
  prosthiosChiastosSyndesmosPage,
  tenontopatheiaEpigonatidikoyTenontaPage,
  syndromoProskroysisYpakromiakisProstrivisPage,
  diastremmaPodoknimikisPage,
  pelmatiaiaAponeyrositidaPage,
  rixiAchilleioyTenontaPage,
  epikondylitidaPage,
  arthroplastikiIschioyPage,
  stenotikiTenontoelytritidaDeQuervainPage,
  syndromoKarpiaioySolinaPage,
];

/** Η σελίδα-κόμβος με όλες τις παθήσεις (βλ. `src/app/pathiseis/page.tsx`). */
export const CONDITIONS_HUB_PATH = "/pathiseis";

/** Το URL μιας σελίδας πάθησης, π.χ. "/pathiseis/osfyalgia". */
export const conditionPageHref = (slug: string) =>
  `${CONDITIONS_HUB_PATH}/${slug}`;

/** Οι σελίδες μιας κατηγορίας παθήσεων, με τη σειρά δήλωσής τους. */
export const conditionPagesByCategory = (categoryId: string) =>
  conditionPages.filter((page) => page.categoryId === categoryId);

/**
 * Χτίζει τα SEO metadata μιας σελίδας πάθησης — ίδια λογική τίτλου/canonical
 * με τις σελίδες υπηρεσιών (βλ. `src/content/service-pages/index.ts`).
 */
export function buildConditionMetadata(content: ConditionPageContent): Metadata {
  const title = `${content.meta.title} | ${SITE_NAME_SUFFIX}`;
  const url = conditionPageHref(content.slug);

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
    },
  };
}

export { conditionCategories };
export type { ConditionCategory, ConditionCategoryId } from "./categories";
export type { ConditionPageContent } from "./types";

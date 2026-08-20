import type { Metadata } from "next";
import type { ConditionPageContent } from "./types";
import { SITE_NAME } from "@/lib/site";
import { osfyalgiaPage } from "./osfyalgia";
import { ischialgiaDiskopatheiaPage } from "./ischialgia-diskopatheia";
import { afxenikoSyndromoPage } from "./afxeniko-syndromo";
import { ponokefaloiAfxenogeneisPage } from "./ponokefaloi-afxenogeneis";
import { tenontitidaOmouPage } from "./tenontitida-omou";
import { pagomenosOmosPage } from "./pagomenos-omos";
import { rixiStrofikouPetalouPage } from "./rixi-strofikou-petalou";
import { rixiMiniskouChiastouPage } from "./rixi-miniskou-chiastou";
import { osteoarthritidaIschiouGonatouPage } from "./osteoarthritida-ischiou-gonatou";
import { chondropatheiaEpigonatidasPage } from "./chondropatheia-epigonatidas";
import { syndromoLagonoknimiaiasTainiasPage } from "./syndromo-lagonoknimiaias-tainias";
import { diastremmaPodoknimikisPage } from "./diastremma-podoknimikis";
import { pelmatiaiaAponevrositidaPage } from "./pelmatiaia-aponevrositida";
import { tenontopatheiaAchilleiouPage } from "./tenontopatheia-achilleiou";
import { thlaseisMyonPage } from "./thlaseis-myon";
import { exoEpikondylitidaPage } from "./exo-epikondylitida";
import { syndromoKoiliakonProsagogonPage } from "./syndromo-koiliakon-prosagogon";
import { apokatastasiArthroplastikisPage } from "./apokatastasi-arthroplastikis";
import { apokatastasiSyndesmoplastikisChiastouPage } from "./apokatastasi-syndesmoplastikis-chiastou";
import { apokatastasiSyrrafisStrofikouPetalouPage } from "./apokatastasi-syrrafis-strofikou-petalou";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/** Όλες οι σελίδες παθήσεων, ομαδοποιημένες όπως στο `conditions.json`. */
export const conditionPages: ConditionPageContent[] = [
  osfyalgiaPage,
  ischialgiaDiskopatheiaPage,
  afxenikoSyndromoPage,
  ponokefaloiAfxenogeneisPage,
  tenontitidaOmouPage,
  pagomenosOmosPage,
  rixiStrofikouPetalouPage,
  rixiMiniskouChiastouPage,
  osteoarthritidaIschiouGonatouPage,
  chondropatheiaEpigonatidasPage,
  syndromoLagonoknimiaiasTainiasPage,
  diastremmaPodoknimikisPage,
  pelmatiaiaAponevrositidaPage,
  tenontopatheiaAchilleiouPage,
  thlaseisMyonPage,
  exoEpikondylitidaPage,
  syndromoKoiliakonProsagogonPage,
  apokatastasiArthroplastikisPage,
  apokatastasiSyndesmoplastikisChiastouPage,
  apokatastasiSyrrafisStrofikouPetalouPage,
];

/** Η σελίδα-κόμβος με όλες τις παθήσεις (βλ. `src/app/pathiseis/page.tsx`). */
export const CONDITIONS_HUB_PATH = "/pathiseis";

/** Το URL μιας σελίδας πάθησης, π.χ. "/pathiseis/osfyalgia". */
export const conditionPageHref = (slug: string) =>
  `${CONDITIONS_HUB_PATH}/${slug}`;

/** Οι σελίδες μιας ομάδας παθήσεων, με τη σειρά δήλωσής τους. */
export const conditionPagesByGroup = (groupId: string) =>
  conditionPages.filter((page) => page.groupId === groupId);

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

export type { ConditionPageContent } from "./types";

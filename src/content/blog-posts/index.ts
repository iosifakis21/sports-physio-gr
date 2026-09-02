import type { Metadata } from "next";
import type { BlogPostContent } from "./types";
import { SITE_NAME } from "@/lib/site";
import { kiliMesospondylioyDiskouOxyStadioPost } from "./kili-mesospondylioy-diskou-oxy-stadio";
import { diastremmaPodoknimikisPost } from "./diastremma-podoknimikis";
import { epistrefeiStisProponiseisGiaToUfcAndreasMichailidisPost } from "./epistrefei-stis-proponiseis-gia-to-ufc-andreas-michailidis";
import { kineoGlobusRobotikoMichanimaApokatastasisPost } from "./kineo-globus-robotiko-michanima-apokatastasis";
import { antiproedrosPagkosmiasOmospondiasCutmenWcaPost } from "./antiproedros-pagkosmias-omospondias-cutmen-wca";
import { tecarWintecareTPlusSportsPhysioSioulisPost } from "./tecar-wintecare-t-plus-sports-physio-sioulis";
import { megaliEpitychiaAlloEnaSeminarioCutmanMichalisSioulisPost } from "./megali-epitychia-allo-ena-seminario-cutman-michalis-sioulis";
import { megaliEpitychiaGiaEnaAkomiSeminarioTechnisCutmanPost } from "./megali-epitychia-gia-ena-akomi-seminario-technis-cutman";
import { seminarioCutman4NoemvriouMichalisSioulisVideoPost } from "./seminario-cutman-4-noemvriou-michalis-sioulis-video";
import { seminarioCutman18OktovriouMichalisSioulisAthinaPost } from "./seminario-cutman-18-oktovriou-michalis-sioulis-athina";
import { tenontopatheiaAchilleiouTenontaPost } from "./tenontopatheia-achilleiou-tenonta";
import { stinEthnikiOmadaMouaiTaiFysikotherapeutisMichalisSioulisPost } from "./stin-ethniki-omada-mouai-tai-fysikotherapeutis-michalis-sioulis";
import { stinElladaJacobStitchDuranEliteCutmenPost } from "./stin-ellada-jacob-stitch-duran-elite-cutmen";
import { wyndhamGrandSynentefxiTypouProtathlimaIcaPost } from "./wyndham-grand-synentefxi-typou-protathlima-ica";
import { epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost } from "./epistrefei-stis-proponiseis-giorgos-tzanos-rixi-pxs";
import { cutmanStitchEpisfragiseLaEpitychiaSeminariouSioulisPost } from "./cutman-stitch-episfragise-la-epitychia-seminariou-sioulis";

const SITE_NAME_SUFFIX = "Sports-Physio.gr — Μιχάλης Σιούλης";

/**
 * Όλα τα άρθρα του blog, με τη σειρά δήλωσής τους — η σειρά εμφάνισης στη
 * λίστα προκύπτει από την ημερομηνία (βλ. `blogPostsSortedByDate`), όχι από
 * αυτόν τον πίνακα.
 */
export const blogPosts: BlogPostContent[] = [
  kiliMesospondylioyDiskouOxyStadioPost,
  diastremmaPodoknimikisPost,
  epistrefeiStisProponiseisGiaToUfcAndreasMichailidisPost,
  kineoGlobusRobotikoMichanimaApokatastasisPost,
  antiproedrosPagkosmiasOmospondiasCutmenWcaPost,
  tecarWintecareTPlusSportsPhysioSioulisPost,
  megaliEpitychiaAlloEnaSeminarioCutmanMichalisSioulisPost,
  megaliEpitychiaGiaEnaAkomiSeminarioTechnisCutmanPost,
  seminarioCutman4NoemvriouMichalisSioulisVideoPost,
  seminarioCutman18OktovriouMichalisSioulisAthinaPost,
  tenontopatheiaAchilleiouTenontaPost,
  stinEthnikiOmadaMouaiTaiFysikotherapeutisMichalisSioulisPost,
  stinElladaJacobStitchDuranEliteCutmenPost,
  wyndhamGrandSynentefxiTypouProtathlimaIcaPost,
  epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost,
  cutmanStitchEpisfragiseLaEpitychiaSeminariouSioulisPost,
];

/** Η σελίδα-κόμβος με όλα τα άρθρα (βλ. `src/app/blog/page.tsx`). */
export const BLOG_HUB_PATH = "/blog";

/** Το URL ενός άρθρου, π.χ. "/blog/diastremma-podoknimikis". */
export const blogPostHref = (slug: string) => `${BLOG_HUB_PATH}/${slug}`;

/** Όλα τα άρθρα, πιο πρόσφατα πρώτα. */
export const blogPostsSortedByDate = (): BlogPostContent[] =>
  [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

/**
 * Χτίζει τα SEO metadata ενός άρθρου — ίδια λογική τίτλου/canonical με τις
 * σελίδες παθήσεων (βλ. `src/content/condition-pages/index.ts`).
 */
export function buildBlogPostMetadata(content: BlogPostContent): Metadata {
  const title = `${content.meta.title} | ${SITE_NAME_SUFFIX}`;
  const url = blogPostHref(content.slug);

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
      ...(content.coverImage ? { images: [content.coverImage.src] } : {}),
    },
  };
}

export type { BlogPostContent } from "./types";
export { BLOG_CATEGORY_LABELS } from "./types";

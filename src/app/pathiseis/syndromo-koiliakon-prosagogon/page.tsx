import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { syndromoKoiliakonProsagogonPage } from "@/content/condition-pages/syndromo-koiliakon-prosagogon";

export const metadata: Metadata = buildConditionMetadata(syndromoKoiliakonProsagogonPage);

export default function Page() {
  return <ConditionPageTemplate content={syndromoKoiliakonProsagogonPage} />;
}

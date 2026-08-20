import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { syndromoLagonoknimiaiasTainiasPage } from "@/content/condition-pages/syndromo-lagonoknimiaias-tainias";

export const metadata: Metadata = buildConditionMetadata(syndromoLagonoknimiaiasTainiasPage);

export default function Page() {
  return <ConditionPageTemplate content={syndromoLagonoknimiaiasTainiasPage} />;
}

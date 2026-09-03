import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { syndromoThorakikisExodoyPage } from "@/content/condition-pages/syndromo-thorakikis-exodoy";

export const metadata: Metadata = buildConditionMetadata(syndromoThorakikisExodoyPage);

export default function Page() {
  return <ConditionPageTemplate content={syndromoThorakikisExodoyPage} />;
}

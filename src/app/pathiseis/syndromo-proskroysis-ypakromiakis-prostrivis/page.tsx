import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { syndromoProskroysisYpakromiakisProstrivisPage } from "@/content/condition-pages/syndromo-proskroysis-ypakromiakis-prostrivis";

export const metadata: Metadata = buildConditionMetadata(syndromoProskroysisYpakromiakisProstrivisPage);

export default function Page() {
  return <ConditionPageTemplate content={syndromoProskroysisYpakromiakisProstrivisPage} />;
}

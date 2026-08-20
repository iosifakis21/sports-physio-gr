import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { afxenikoSyndromoPage } from "@/content/condition-pages/afxeniko-syndromo";

export const metadata: Metadata = buildConditionMetadata(afxenikoSyndromoPage);

export default function Page() {
  return <ConditionPageTemplate content={afxenikoSyndromoPage} />;
}

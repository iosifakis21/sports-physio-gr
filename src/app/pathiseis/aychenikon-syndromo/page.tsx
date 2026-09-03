import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { aychenikonSyndromoPage } from "@/content/condition-pages/aychenikon-syndromo";

export const metadata: Metadata = buildConditionMetadata(aychenikonSyndromoPage);

export default function Page() {
  return <ConditionPageTemplate content={aychenikonSyndromoPage} />;
}

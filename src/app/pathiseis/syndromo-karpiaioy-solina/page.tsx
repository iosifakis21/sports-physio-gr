import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { syndromoKarpiaioySolinaPage } from "@/content/condition-pages/syndromo-karpiaioy-solina";

export const metadata: Metadata = buildConditionMetadata(syndromoKarpiaioySolinaPage);

export default function Page() {
  return <ConditionPageTemplate content={syndromoKarpiaioySolinaPage} />;
}

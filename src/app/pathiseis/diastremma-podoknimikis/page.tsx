import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { diastremmaPodoknimikisPage } from "@/content/condition-pages/diastremma-podoknimikis";

export const metadata: Metadata = buildConditionMetadata(diastremmaPodoknimikisPage);

export default function Page() {
  return <ConditionPageTemplate content={diastremmaPodoknimikisPage} />;
}

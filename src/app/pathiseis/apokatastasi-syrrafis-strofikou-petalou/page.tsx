import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { apokatastasiSyrrafisStrofikouPetalouPage } from "@/content/condition-pages/apokatastasi-syrrafis-strofikou-petalou";

export const metadata: Metadata = buildConditionMetadata(apokatastasiSyrrafisStrofikouPetalouPage);

export default function Page() {
  return <ConditionPageTemplate content={apokatastasiSyrrafisStrofikouPetalouPage} />;
}

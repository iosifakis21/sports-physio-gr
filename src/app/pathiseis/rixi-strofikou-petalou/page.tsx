import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { rixiStrofikouPetalouPage } from "@/content/condition-pages/rixi-strofikou-petalou";

export const metadata: Metadata = buildConditionMetadata(rixiStrofikouPetalouPage);

export default function Page() {
  return <ConditionPageTemplate content={rixiStrofikouPetalouPage} />;
}

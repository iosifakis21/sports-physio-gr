import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { rixiMiniskouChiastouPage } from "@/content/condition-pages/rixi-miniskou-chiastou";

export const metadata: Metadata = buildConditionMetadata(rixiMiniskouChiastouPage);

export default function Page() {
  return <ConditionPageTemplate content={rixiMiniskouChiastouPage} />;
}

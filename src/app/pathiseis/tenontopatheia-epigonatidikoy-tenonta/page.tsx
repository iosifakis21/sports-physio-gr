import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { tenontopatheiaEpigonatidikoyTenontaPage } from "@/content/condition-pages/tenontopatheia-epigonatidikoy-tenonta";

export const metadata: Metadata = buildConditionMetadata(tenontopatheiaEpigonatidikoyTenontaPage);

export default function Page() {
  return <ConditionPageTemplate content={tenontopatheiaEpigonatidikoyTenontaPage} />;
}

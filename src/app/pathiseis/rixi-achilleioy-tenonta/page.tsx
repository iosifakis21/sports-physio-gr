import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { rixiAchilleioyTenontaPage } from "@/content/condition-pages/rixi-achilleioy-tenonta";

export const metadata: Metadata = buildConditionMetadata(rixiAchilleioyTenontaPage);

export default function Page() {
  return <ConditionPageTemplate content={rixiAchilleioyTenontaPage} />;
}

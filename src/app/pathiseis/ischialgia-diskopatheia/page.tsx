import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { ischialgiaDiskopatheiaPage } from "@/content/condition-pages/ischialgia-diskopatheia";

export const metadata: Metadata = buildConditionMetadata(ischialgiaDiskopatheiaPage);

export default function Page() {
  return <ConditionPageTemplate content={ischialgiaDiskopatheiaPage} />;
}

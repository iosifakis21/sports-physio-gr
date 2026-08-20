import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { tenontopatheiaAchilleiouPage } from "@/content/condition-pages/tenontopatheia-achilleiou";

export const metadata: Metadata = buildConditionMetadata(tenontopatheiaAchilleiouPage);

export default function Page() {
  return <ConditionPageTemplate content={tenontopatheiaAchilleiouPage} />;
}

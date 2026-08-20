import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { chondropatheiaEpigonatidasPage } from "@/content/condition-pages/chondropatheia-epigonatidas";

export const metadata: Metadata = buildConditionMetadata(chondropatheiaEpigonatidasPage);

export default function Page() {
  return <ConditionPageTemplate content={chondropatheiaEpigonatidasPage} />;
}

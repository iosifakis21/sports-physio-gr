import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { skoliosiPage } from "@/content/condition-pages/skoliosi";

export const metadata: Metadata = buildConditionMetadata(skoliosiPage);

export default function Page() {
  return <ConditionPageTemplate content={skoliosiPage} />;
}

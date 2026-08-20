import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { osfyalgiaPage } from "@/content/condition-pages/osfyalgia";

export const metadata: Metadata = buildConditionMetadata(osfyalgiaPage);

export default function Page() {
  return <ConditionPageTemplate content={osfyalgiaPage} />;
}

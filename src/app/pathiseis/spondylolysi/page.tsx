import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { spondylolysiPage } from "@/content/condition-pages/spondylolysi";

export const metadata: Metadata = buildConditionMetadata(spondylolysiPage);

export default function Page() {
  return <ConditionPageTemplate content={spondylolysiPage} />;
}

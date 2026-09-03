import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { spondylolisthisiPage } from "@/content/condition-pages/spondylolisthisi";

export const metadata: Metadata = buildConditionMetadata(spondylolisthisiPage);

export default function Page() {
  return <ConditionPageTemplate content={spondylolisthisiPage} />;
}

import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { spondyloarthropatheiaPage } from "@/content/condition-pages/spondyloarthropatheia";

export const metadata: Metadata = buildConditionMetadata(spondyloarthropatheiaPage);

export default function Page() {
  return <ConditionPageTemplate content={spondyloarthropatheiaPage} />;
}

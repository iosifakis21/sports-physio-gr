import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { ponokefaloiAfxenogeneisPage } from "@/content/condition-pages/ponokefaloi-afxenogeneis";

export const metadata: Metadata = buildConditionMetadata(ponokefaloiAfxenogeneisPage);

export default function Page() {
  return <ConditionPageTemplate content={ponokefaloiAfxenogeneisPage} />;
}

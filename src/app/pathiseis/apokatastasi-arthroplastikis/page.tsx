import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { apokatastasiArthroplastikisPage } from "@/content/condition-pages/apokatastasi-arthroplastikis";

export const metadata: Metadata = buildConditionMetadata(apokatastasiArthroplastikisPage);

export default function Page() {
  return <ConditionPageTemplate content={apokatastasiArthroplastikisPage} />;
}

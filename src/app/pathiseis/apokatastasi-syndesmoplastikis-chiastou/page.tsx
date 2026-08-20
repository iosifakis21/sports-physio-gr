import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { apokatastasiSyndesmoplastikisChiastouPage } from "@/content/condition-pages/apokatastasi-syndesmoplastikis-chiastou";

export const metadata: Metadata = buildConditionMetadata(apokatastasiSyndesmoplastikisChiastouPage);

export default function Page() {
  return <ConditionPageTemplate content={apokatastasiSyndesmoplastikisChiastouPage} />;
}

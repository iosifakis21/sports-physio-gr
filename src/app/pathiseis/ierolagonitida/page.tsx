import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { ierolagonitidaPage } from "@/content/condition-pages/ierolagonitida";

export const metadata: Metadata = buildConditionMetadata(ierolagonitidaPage);

export default function Page() {
  return <ConditionPageTemplate content={ierolagonitidaPage} />;
}

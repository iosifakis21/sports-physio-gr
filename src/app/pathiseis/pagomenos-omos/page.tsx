import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { pagomenosOmosPage } from "@/content/condition-pages/pagomenos-omos";

export const metadata: Metadata = buildConditionMetadata(pagomenosOmosPage);

export default function Page() {
  return <ConditionPageTemplate content={pagomenosOmosPage} />;
}

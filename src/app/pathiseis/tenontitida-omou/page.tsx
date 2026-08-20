import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { tenontitidaOmouPage } from "@/content/condition-pages/tenontitida-omou";

export const metadata: Metadata = buildConditionMetadata(tenontitidaOmouPage);

export default function Page() {
  return <ConditionPageTemplate content={tenontitidaOmouPage} />;
}

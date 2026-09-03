import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { kyfosiPage } from "@/content/condition-pages/kyfosi";

export const metadata: Metadata = buildConditionMetadata(kyfosiPage);

export default function Page() {
  return <ConditionPageTemplate content={kyfosiPage} />;
}

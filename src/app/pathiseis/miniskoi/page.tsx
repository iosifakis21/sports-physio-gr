import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { miniskoiPage } from "@/content/condition-pages/miniskoi";

export const metadata: Metadata = buildConditionMetadata(miniskoiPage);

export default function Page() {
  return <ConditionPageTemplate content={miniskoiPage} />;
}

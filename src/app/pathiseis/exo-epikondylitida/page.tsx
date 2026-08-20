import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { exoEpikondylitidaPage } from "@/content/condition-pages/exo-epikondylitida";

export const metadata: Metadata = buildConditionMetadata(exoEpikondylitidaPage);

export default function Page() {
  return <ConditionPageTemplate content={exoEpikondylitidaPage} />;
}

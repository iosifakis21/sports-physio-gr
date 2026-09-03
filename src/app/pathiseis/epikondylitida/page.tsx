import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { epikondylitidaPage } from "@/content/condition-pages/epikondylitida";

export const metadata: Metadata = buildConditionMetadata(epikondylitidaPage);

export default function Page() {
  return <ConditionPageTemplate content={epikondylitidaPage} />;
}

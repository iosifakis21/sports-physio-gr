import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { arthroplastikiIschioyPage } from "@/content/condition-pages/arthroplastiki-ischioy";

export const metadata: Metadata = buildConditionMetadata(arthroplastikiIschioyPage);

export default function Page() {
  return <ConditionPageTemplate content={arthroplastikiIschioyPage} />;
}

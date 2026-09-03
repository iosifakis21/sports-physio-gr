import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { stenotikiTenontoelytritidaDeQuervainPage } from "@/content/condition-pages/stenotiki-tenontoelytritida-de-quervain";

export const metadata: Metadata = buildConditionMetadata(stenotikiTenontoelytritidaDeQuervainPage);

export default function Page() {
  return <ConditionPageTemplate content={stenotikiTenontoelytritidaDeQuervainPage} />;
}

import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { osteoarthritidaIschiouGonatouPage } from "@/content/condition-pages/osteoarthritida-ischiou-gonatou";

export const metadata: Metadata = buildConditionMetadata(osteoarthritidaIschiouGonatouPage);

export default function Page() {
  return <ConditionPageTemplate content={osteoarthritidaIschiouGonatouPage} />;
}

import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { pelmatiaiaAponeyrositidaPage } from "@/content/condition-pages/pelmatiaia-aponeyrositida";

export const metadata: Metadata = buildConditionMetadata(pelmatiaiaAponeyrositidaPage);

export default function Page() {
  return <ConditionPageTemplate content={pelmatiaiaAponeyrositidaPage} />;
}

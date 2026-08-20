import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { pelmatiaiaAponevrositidaPage } from "@/content/condition-pages/pelmatiaia-aponevrositida";

export const metadata: Metadata = buildConditionMetadata(pelmatiaiaAponevrositidaPage);

export default function Page() {
  return <ConditionPageTemplate content={pelmatiaiaAponevrositidaPage} />;
}

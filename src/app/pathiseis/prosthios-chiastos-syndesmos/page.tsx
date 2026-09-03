import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { prosthiosChiastosSyndesmosPage } from "@/content/condition-pages/prosthios-chiastos-syndesmos";

export const metadata: Metadata = buildConditionMetadata(prosthiosChiastosSyndesmosPage);

export default function Page() {
  return <ConditionPageTemplate content={prosthiosChiastosSyndesmosPage} />;
}

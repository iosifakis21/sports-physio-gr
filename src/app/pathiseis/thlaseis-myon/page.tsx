import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { thlaseisMyonPage } from "@/content/condition-pages/thlaseis-myon";

export const metadata: Metadata = buildConditionMetadata(thlaseisMyonPage);

export default function Page() {
  return <ConditionPageTemplate content={thlaseisMyonPage} />;
}

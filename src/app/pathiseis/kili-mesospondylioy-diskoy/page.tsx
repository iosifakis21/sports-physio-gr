import type { Metadata } from "next";
import { ConditionPageTemplate } from "@/components/ConditionPageTemplate";
import { buildConditionMetadata } from "@/content/condition-pages";
import { kiliMesospondylioyDiskoyPage } from "@/content/condition-pages/kili-mesospondylioy-diskoy";

export const metadata: Metadata = buildConditionMetadata(kiliMesospondylioyDiskoyPage);

export default function Page() {
  return <ConditionPageTemplate content={kiliMesospondylioyDiskoyPage} />;
}

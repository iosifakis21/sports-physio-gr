import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { manualTherapyPage } from "@/content/service-pages/manual-therapy";

export const metadata: Metadata = buildServiceMetadata(manualTherapyPage);

export default function Page() {
  return <ServicePageTemplate content={manualTherapyPage} />;
}

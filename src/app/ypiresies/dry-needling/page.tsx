import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { dryNeedlingPage } from "@/content/service-pages/dry-needling";

export const metadata: Metadata = buildServiceMetadata(dryNeedlingPage);

export default function Page() {
  return <ServicePageTemplate content={dryNeedlingPage} />;
}

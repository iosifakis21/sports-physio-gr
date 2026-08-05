import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { athlitikiApokatastasiPage } from "@/content/service-pages/athlitiki-apokatastasi";

export const metadata: Metadata = buildServiceMetadata(athlitikiApokatastasiPage);

export default function Page() {
  return <ServicePageTemplate content={athlitikiApokatastasiPage} />;
}

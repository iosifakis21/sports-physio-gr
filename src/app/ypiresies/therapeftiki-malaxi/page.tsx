import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { therapeftikiMalaxiPage } from "@/content/service-pages/therapeftiki-malaxi";

export const metadata: Metadata = buildServiceMetadata(therapeftikiMalaxiPage);

export default function Page() {
  return <ServicePageTemplate content={therapeftikiMalaxiPage} />;
}

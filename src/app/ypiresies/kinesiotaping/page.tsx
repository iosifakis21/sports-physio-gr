import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { kinesiotapingPage } from "@/content/service-pages/kinesiotaping";

export const metadata: Metadata = buildServiceMetadata(kinesiotapingPage);

export default function Page() {
  return <ServicePageTemplate content={kinesiotapingPage} />;
}

import type { Metadata } from "next";
import { ServicePage, serviceMetadata } from "@/components/ServicePage";

export const metadata: Metadata = serviceMetadata("womens-health");

export default function Page() {
  return <ServicePage slug="womens-health" />;
}

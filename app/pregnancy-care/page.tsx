import type { Metadata } from "next";
import { ServicePage, serviceMetadata } from "@/components/ServicePage";

export const metadata: Metadata = serviceMetadata("pregnancy-care");

export default function Page() {
  return <ServicePage slug="pregnancy-care" />;
}

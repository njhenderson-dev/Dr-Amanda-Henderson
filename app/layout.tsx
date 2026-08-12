import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import {
  jsonLdGraph,
  personSchema,
  physicianSchema,
  clinicSchema,
  websiteSchema,
  racgpSchema,
} from "@/lib/schema";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr Amanda Henderson | Family GP, Maroubra Sydney",
    template: "%s | Dr Amanda Henderson",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Dr Amanda Henderson" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Dr Amanda Henderson | Family GP, Maroubra Sydney",
    description: site.description,
    images: [
      {
        url: "/images/og-amanda.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Amanda Henderson, family GP in Maroubra, Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Amanda Henderson | Family GP, Maroubra Sydney",
    description: site.description,
    images: ["/images/og-amanda.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <JsonLd
          data={jsonLdGraph(
            personSchema(),
            physicianSchema(),
            clinicSchema(),
            websiteSchema(),
            racgpSchema(),
          )}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-24 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBookBar />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

import Script from "next/script";

// Google Analytics 4 (gtag.js). Loaded in production only so local dev doesn't
// pollute analytics. The appointment selector's track() helper already fires
// name-only events (no health data) into gtag once this is present.
const GA_ID = "G-DJ10M42D8X";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

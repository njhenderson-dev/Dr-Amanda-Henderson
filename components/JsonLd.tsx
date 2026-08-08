// Renders a JSON-LD script tag. Server component — emitted into static HTML.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

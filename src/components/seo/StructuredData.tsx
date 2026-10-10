/**
 * Renders a JSON-LD document. "<" is escaped so CMS-provided text can never
 * close the script tag early. Build documents with the helpers in lib/seo/schema.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

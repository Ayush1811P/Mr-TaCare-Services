/**
 * Server-rendered JSON-LD.
 *
 * Rendering on the server means crawlers see structured data in the initial
 * HTML rather than after hydration.
 *
 * The payload is built from typed, application-controlled objects — never from
 * user input — and `<` is escaped so the script tag cannot be broken out of.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

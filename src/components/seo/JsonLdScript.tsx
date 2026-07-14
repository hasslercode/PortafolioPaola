import type { buildGraph } from '@/lib/seo/jsonld';

type JsonLdScriptProps = {
  graph: ReturnType<typeof buildGraph>;
};

/** Single JSON-LD payload per page — inject once in the page tree. */
export function JsonLdScript({ graph }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

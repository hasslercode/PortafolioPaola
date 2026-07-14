import { homeGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

type SchemaProviderProps = {
  locale: string;
  reviews?: Array<{ reviewBody: string; authorName: string; result?: string }>;
};

/**
 * Home-oriented core schema helper.
 * Prefer page-level JsonLdScript + graph builders for richer entities.
 */
export function SchemaProvider({ locale, reviews = [] }: SchemaProviderProps) {
  const typed = locale === 'en' ? 'en' : 'es';
  const graph = homeGraph(typed, reviews);
  return <JsonLdScript graph={graph} />;
}

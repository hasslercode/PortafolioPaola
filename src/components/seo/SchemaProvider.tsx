import { homeGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

type SchemaProviderProps = {
  locale: string;
};

/**
 * Home-oriented core schema helper.
 * Testimonials stay in the page; they are not emitted as Review JSON-LD.
 */
export function SchemaProvider({ locale }: SchemaProviderProps) {
  const typed = locale === 'en' ? 'en' : 'es';
  return <JsonLdScript graph={homeGraph(typed)} />;
}

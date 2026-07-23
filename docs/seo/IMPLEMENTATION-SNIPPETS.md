# Implementation snippets — P0/P1 listos para pegar

Complementa `ROADMAP-TOP10-COLOMBIA.md`. Muchos P0 ya van en este PR; aquí queda el código de referencia y lo pendiente.

---

## P0.1 — OG image liviana

**Archivos:** `src/lib/seo/metadata.ts`, `public/assets/og-paola.jpg`

```ts
ogImage = '/assets/og-paola.jpg',
// ...
images: [{
  url: absoluteOg,
  width: 1200,
  height: 630,
  alt: title,
  type: 'image/jpeg',
}],
```

También actualizar `organizationNode` / `personNode` logo/image si apuntan al PNG pesado.

---

## P0.2 — serviceType alineado a oferta real

**Archivo:** `src/lib/seo/jsonld.ts`

```ts
serviceType: input.serviceType ?? [
  'Content Strategy',
  'Content Production',
  'Video Editing for Social Media',
  'UGC-style Brand Videos',
  'Monthly Social Management',
  'Strategic Advisory',
],
```

---

## P0.3 — Blog en navegación

**Archivo:** `src/features/home/components/Header.jsx`

```jsx
const isBlog = pathname.startsWith('/blog');
// ...
<li className={navItemClass(isBlog)}>
  <Link href="/blog" onClick={handleNavClick}>
    {header.nav.blog}
  </Link>
</li>
```

Footer: `<Link href="/blog">{footer.nav.recursos}</Link>`

---

## P0.4 — Hub → detalle servicio

Mapa `package.id` → `ServiceSlug`:

```ts
const PACKAGE_SERVICE_SLUG: Record<string, string> = {
  estrategia: 'estrategia-contenido',
  produccion: 'produccion-contenido',
  'gestion-mensual': 'gestion-mensual',
};
```

En card, además del CTA modal:

```jsx
<Link
  href={{ pathname: '/services/[slug]', params: { slug: publicSlug } }}
  className="offer-plan__detail-link"
>
  {isEn ? 'See service details' : 'Ver detalle del servicio'}
</Link>
```

---

## P0.5 — Meta home con Colombia

```json
"description": "Estrategia digital, creación de contenido, edición de video y storytelling para emprendedores y marcas en Colombia."
```

Keywords home:

```ts
keywords: [
  'creación de contenido colombia',
  'edición de videos para redes',
  'estrategia de contenido',
  'creador ugc colombia',
  'videos para marcas',
  'paola hoyos',
],
```

---

## P1.3 — Restaurar `/tarifas` (pendiente)

1. Quitar redirect permanente en `next.config.ts` para `/es/tarifas`.  
2. Crear `src/app/[locale]/(pages)/pricing/page.tsx` real (hoy solo redirect).  
3. Tabla COP “desde” + FAQ + Offer JSON-LD con `minPrice`.  
4. Canonical propio; no alias a services.

Ejemplo Offer:

```ts
offerNode({
  locale,
  name: 'Producción de contenido',
  lowPrice: 800000,
  highPrice: 3500000,
  priceCurrency: 'COP',
  url: absoluteUrl('/es/servicios/produccion-contenido'),
})
```

---

## P1.4 — WhatsApp CTA (pendiente config)

`src/config/site.ts`:

```ts
contact: {
  email: 'pahoyoscardona@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? '57XXXXXXXXXX',
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
},
```

Helper:

```ts
export function whatsappUrl(text: string) {
  const phone = siteConfig.contact.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
```

---

## P1.6 — noindex EN blog hasta traducir

En `blog/[slug]/page.tsx` `generateMetadata`:

```ts
noIndex: locale === 'en', // temporal
```

O mejor: traducir bodies EN (solución correcta).

---

## P2 — Nuevo servicio UGC (scaffold)

1. Añadir slug en `registry.ts`: `ugc-videos-marcas` / `ugc-brand-videos`.  
2. MDX en `content/services/{es,en}/`.  
3. Card en hub + schema Service.  
4. Primary KW: `creador ugc colombia`, `videos ugc para marcas`.

---

## Frontmatter cluster (schema upgrade)

`src/content/schemas.ts`:

```ts
topic: z.enum([
  'seo', 'instagram', 'tiktok', 'branding', 'marketing',
  'video', 'ugc', 'strategy', 'local', 'comparison',
]),
primaryKeyword: z.string().optional(),
cluster: z.enum([
  'strategy', 'production', 'ugc', 'entrepreneurs', 'local', 'comparison',
]).optional(),
relatedSlugs: z.array(z.string()).default([]),
serviceCta: z.string().optional(),
```

---

## Internal link block (componente)

```tsx
export function RelatedContent({
  items,
}: { items: Array<{ href: string; title: string }> }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Contenido relacionado" className="related-content">
      <h2>Sigue explorando</h2>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## sitemap lastModified real (P1)

```ts
lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
```

Pasar fechas desde loaders, no `new Date()` global.

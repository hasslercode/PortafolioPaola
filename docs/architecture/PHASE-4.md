# Architecture — Phase 4 (Schema JSON-LD)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete

## Goal

Emit one valid `application/ld+json` `@graph` per public page with Person, Organization, WebSite, ProfessionalService as core nodes, plus page-specific entities (Service, Article, CaseStudy/CreativeWork, FAQPage, BreadcrumbList, Review, Offer).

## Decisions

### 1. Pure TS builders + TSX injector

- `src/lib/seo/jsonld.ts` — node factories
- `src/lib/seo/graphs.ts` — page-level graph composers (no JSX)
- `src/components/seo/JsonLdScript.tsx` — single script tag

Keeping graphs as `.ts` avoids bundler JSX parse failures.

### 2. One graph per page (no layout double-inject)

`SchemaProvider` was removed from `[locale]/layout`. Each route owns its graph:

| Route | Graph |
|-------|--------|
| Home | `homeGraph` + Review nodes from testimonials |
| Hubs (services, cases, blog, pricing, about, contact) | `hubGraph` (+ Offer/FAQ on pricing) |
| Service detail | `servicePageGraph` + FAQPage |
| Case study | `caseStudyPageGraph` + FAQPage |
| Blog post | `articlePageGraph` + FAQPage |

### 3. `@id` anchors for entity linking

Core nodes use stable IDs (`/{locale}/#person`, `#organization`, `#website`, `#professional-service`) so page entities can `$ref` without duplicating Person data.

### 4. BreadcrumbList in schema + visible UI

Phase 3 HTML crumbs + Phase 4 `BreadcrumbList` nodes use the same `buildBreadcrumbs()` data.

## Files

| Path | Role |
|------|------|
| `src/lib/seo/jsonld.ts` | Node builders |
| `src/lib/seo/graphs.ts` | Page graphs |
| `src/components/seo/JsonLdScript.tsx` | Script injection |
| `src/components/seo/SchemaProvider.tsx` | Optional home helper (unused in layout) |

## Verify

```bash
npm run build
# Inspect built HTML types:
node -e "
const fs=require('fs');
const html=fs.readFileSync('.next/server/app/es.html','utf8');
const m=html.match(/application\\/ld\\+json[^>]*>([^<]+)</);
console.log(JSON.parse(m[1])['@graph'].map(n=>n['@type']));
"
```

Expected home types: `Person, Organization, WebSite, ProfessionalService, WebPage, Review×N`.

## Next — Phase 5 (Content)

Load real MDX (services, case studies, blog) into Zod-validated loaders and wire FAQs into schema + UI.

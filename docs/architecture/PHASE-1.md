# Architecture — Phase 1

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete — do not start Phase 2 until this document is accepted.

## Goal

Replace the React + Vite SPA with a Next.js 15 App Router SSG foundation that is:

- Indexable (HTML in the first response)
- Locale-routed (`/es/...`, `/en/...`)
- Content-decoupled (MDX / Zod contracts → future CMS)
- SEO/GEO-ready (Metadata API, robots, sitemap, JSON-LD @graph stubs)

## Decisions

### 1. Next.js 15 App Router + SSG (not SPA, not heavy SSR)

**Why:** Google Search Central recommends crawlable HTML. App Router static generation delivers full HTML at build time. Client JS is optional progressive enhancement.

**Source:** [Next.js — Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic)

### 2. Metadata API instead of `next-seo`

**Why:** `next-seo` was built for the Pages Router. In App Router, `generateMetadata()` is the official, typed, SSG-friendly API (canonical, OG, Twitter, robots, alternates/hreflang).

**Tradeoff:** Deviates from the package list. Prefer official Next.js over a compatibility layer.

**Source:** [Next.js — generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### 3. Dual sitemap approach (revised)

- **Primary:** `src/app/sitemap.ts` (App Router native)
- **Installed:** `next-sitemap` (available for Phase 3 multi-index if needed)

**Why not postbuild now:** `next-sitemap` writes `public/sitemap.xml`, which overrides the App Router route and caused a conflict. Phase 3 will choose one source of truth.

**Tradeoff:** Package installed but not wired in `postbuild` until SEO phase decides.

### 4. `next-intl` with localized pathnames

Filesystem uses English route keys (`services`, `case-studies`, …). Public URLs localize:

| Key | ES | EN |
|-----|----|----|
| `/services` | `/es/servicios` | `/en/services` |
| `/case-studies` | `/es/casos-estudio` | `/en/case-studies` |
| `/about` | `/es/sobre-mi` | `/en/about` |
| `/contact` | `/es/contacto` | `/en/contact` |
| `/pricing` | `/es/tarifas` | `/en/pricing` |

**Why:** Physical URLs per language (required for hreflang). No client language switcher that mutates the same URL.

**Source:** [next-intl — pathnames](https://next-intl.dev/docs/routing/configuration#pathnames)

### 5. Geographic positioning = Colombia + remote (not city-only)

- Residence signal: Medellín (Person / LocalBusiness later)
- Market signal: Colombia + LatAm + remote
- Local landings only when commercially justified (Phase 5+)

### 6. Content registry + Zod schemas (CMS boundary)

`src/content/registry.ts` + `schemas.ts` + `loaders.ts` + `/content/**/*.mdx` keep copy out of React trees. Phase 5 fills MDX; a headless CMS can replace loaders without touching pages.

### 7. Legacy SPA preserved in `_legacy/`

Visual parity migration = Phase 2. Architecture is not blocked on pixel-perfect UI.

### 8. Clean Architecture / Feature-first layout

```
src/
  app/                 # routing + composition only
  components/          # atoms / molecules / organisms / ui / layout / seo
  features/            # services, case-studies, analytics, …
  content/             # schemas + loaders (domain)
  config/              # site entity constants
  i18n/                # routing + request config
  lib/seo/             # metadata + jsonld helpers
content/               # MDX source of truth
messages/              # next-intl UI strings
_legacy/               # previous Vite SPA (reference)
```

## Route map (SSG)

```
/es|en
/es/servicios| /en/services
/es/servicios/[slug] | /en/services/[slug]
/es/casos-estudio/[slug] | /en/case-studies/[slug]
/es/sobre-mi | /en/about
/es/contacto | /en/contact
/es/tarifas | /en/pricing
/es|en/blog/[slug]
```

Service slugs: `community-manager`, `estrategia-digital`, `storytelling`, `creacion-contenido`, `cobertura-eventos`, `email-marketing`  
Case slugs: `parque-alegra`, `coca-cola`, `starbucks`, `hm`, `cine-colombia`

## Explicitly out of Phase 1

- Visual migration (Hero, animations, scrapbook UI) → Phase 2
- Full SEO polish / RSS / breadcrumbs UI → Phase 3
- Complete JSON-LD graph per page type → Phase 4
- Real MDX copy → Phase 5
- CWV tuning → Phase 6
- GEO answer blocks polish → Phase 7
- Test suite → Phase 8

## Next steps (Phase 2)

1. Port design tokens, fonts (Cormorant, Caveat), and global CSS from `_legacy`
2. Rebuild Home sections as Server Components + client islands for motion
3. Wire contact modal → WhatsApp / form / Calendly
4. Preserve WCAG AA focus/keyboard patterns

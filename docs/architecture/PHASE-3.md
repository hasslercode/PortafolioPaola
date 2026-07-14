# Architecture — Phase 3 (SEO)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete

## Goal

Make every public URL crawlable with correct **canonical**, **hreflang**, **OG/Twitter**, **sitemap alternates**, **RSS**, **breadcrumbs**, and **legacy redirects** — aligned with Google Search Central (localized versions) and Next.js Metadata API.

## Decisions

### 1. App Router sitemap only (no next-sitemap)

`app/sitemap.ts` is the single source of truth. `next-sitemap` was removed because it wrote `public/sitemap.xml` and overrode the App Router route.

### 2. Locale-aware path builder (`lib/seo/paths.ts`)

**Bug fixed:** Phase 1 swapped `/en/services` → `/es/services` for hreflang. Correct pair is `/en/services` ↔ `/es/servicios` (and EN/ES service slugs like `digital-strategy` ↔ `estrategia-digital`).

### 3. Absolute URLs in `alternates.languages`

Google documents absolute URLs for `hreflang` link annotations. We emit `es-CO`, `en`, `x-default`.

### 4. RSS at `/{locale}/feed.xml`

Commercial-intent feed for syndication / GEO discovery. Lives outside `/blog/[slug]` to avoid App Router conflicts with dynamic segments. Linked via metadata `alternates.types` and an on-page RSS link on the blog index.

### 5. Visible breadcrumbs on all non-home marketing pages

Crawlable HTML trail; `BreadcrumbList` JSON-LD remains Phase 4 (@graph).

### 6. 301 redirects for unprefixed hubs

`/servicios` → `/es/servicios`, `/services` → `/en/services`, etc., plus `/` → `/es`.

### 7. Robots allow major AI crawlers

Explicit allow for GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot (GEO readiness).

## Files

| Path | Role |
|------|------|
| `src/lib/seo/paths.ts` | Localized paths + alternates + breadcrumbs data |
| `src/lib/seo/metadata.ts` | `generateMetadata` helper |
| `src/app/sitemap.ts` | Sitemap + per-URL language alternates |
| `src/app/robots.ts` | robots.txt |
| `src/app/[locale]/feed.xml/route.ts` | RSS 2.0 |
| `src/components/seo/Breadcrumbs.tsx` | UI breadcrumb |
| `next.config.ts` | Redirect map |

## Tradeoffs

| Choice | Cost |
|--------|------|
| RSS lists stub posts | Fine until Phase 5 MDX fills titles/descriptions |
| Breadcrumbs without schema yet | Phase 4 adds BreadcrumbList to @graph |
| AI bots allow-listed | Can tighten later if abuse appears |

## Verify

```bash
npm run build
npm run start
curl -s http://localhost:3000/sitemap.xml | head
curl -sI http://localhost:3000/es | rg -i 'link:|hreflang|canonical' 
curl -s http://localhost:3000/es/feed.xml | head
curl -sI http://localhost:3000/servicios  # → 308/301 /es/servicios
```

## Next — Phase 4 (Schema)

Complete `@graph` helpers: Person, ProfessionalService, FAQ, Review, Offer, BreadcrumbList, Article/CaseStudy per page type.

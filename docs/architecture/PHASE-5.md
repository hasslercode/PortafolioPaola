# Architecture — Phase 5 (MDX Content)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete

## Goal

Replace stub service / case-study / blog bodies with **commercial MDX** (ES + EN), validated by Zod frontmatter, rendered as static HTML with short-answer GEO blocks and FAQ sections that also feed JSON-LD.

## Decisions

### 1. File-backed MDX + gray-matter (CMS-ready)

Loaders in `src/content/loaders.ts` read:

```
content/services/{es,en}/{canonicalSlug}.mdx
content/case-studies/{es,en}/{canonicalSlug}.mdx
content/blog/{es,en}/{canonicalSlug}.mdx
```

Canonical registry slugs stay Spanish-keyed (`estrategia-digital`); public EN paths use aliases (`digital-strategy`) via `serviceSlugLocales`.

### 2. Zod contracts with safe defaults

`draft`, `faq`, `seo.keywords`, `process`, `results`, `metrics` default so incomplete drafts fail soft. `shortAnswer` / SEO descriptions allow up to 400 chars for commercial copy.

### 3. Light markdown renderer (SSG-safe)

`MarkdownBody` converts headings / lists / inline marks without a full MDX runtime on every page — enough for GEO-readable prose. Can swap to `next-mdx-remote` later if needed.

### 4. FAQ dual-use

FAQ arrays in frontmatter power:

1. Visible `FaqSection` accordion/list
2. `FAQPage` nodes inside Phase 4 graphs

### 5. RSS from real posts

`/[locale]/feed.xml` uses `getAllPosts()` titles, short answers, and publish dates.

## Content inventory

| Collection | Count (per locale) |
|------------|--------------------|
| Services | 6 |
| Case studies | 5 |
| Blog (commercial intent) | 5 |

## Files

| Path | Role |
|------|------|
| `content/**/*.mdx` | Commercial copy ES/EN |
| `src/content/schemas.ts` | Zod frontmatter |
| `src/content/loaders.ts` | FS loaders |
| `src/content/registry.ts` | Static params / slug map |
| `src/components/content/MarkdownBody.tsx` | Body HTML |
| `src/components/content/FaqSection.tsx` | FAQ UI |

## Tradeoffs

| Choice | Cost |
|--------|------|
| Filenames = canonical ES slug even in `/en/` | Simple loaders; EN public slugs remain in frontmatter + registry aliases |
| Lightweight markdown | No MDX components in body yet |
| Marketing pages still lightweight chrome | Home keeps legacy visual; hubs are content-first for SEO |

## Verify

```bash
npm run build
npm run start
# Spanish service with FAQ + schema
curl -s http://localhost:3000/es/servicios/estrategia-digital | rg -o 'FAQPage|application/ld\+json' | head
# EN alias
curl -sI http://localhost:3000/en/services/digital-strategy | head
# RSS titles
curl -s http://localhost:3000/es/feed.xml | rg '<title>' | head
```

## Next — Phase 6 (Performance)

CWV: `next/image` islands on home, font subsetting, reduce unused JS from legacy home chrome.

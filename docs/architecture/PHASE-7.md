# Architecture — Phase 7 (GEO)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete

## Goal

Make pages easy for generative engines to cite: short answers first, structured lists/tables, stable facts, TOC anchors, author attribution, and an explicit `llms.txt` map.

## Decisions

### 1. `public/llms.txt` (llmstxt.org)

Machine-readable site map for assistants: who Paola is, preferred citation, ES/EN URLs, accuracy caveats (Parque Alegra tenants, COP ranges).

### 2. Answer-first UI primitives

- `GeoAnswer` — short answer block (also Speakable cssSelector)
- `TableOfContents` — from markdown `##` / `###` with stable `id`s
- `AuthorByline` — E-E-A-T / attribution cue
- `KeyFacts` — verifiable label/value pairs (about + case metrics)

### 3. SpeakableSpecification in JSON-LD

WebPage / Article / Service graphs include `speakable.cssSelector` pointing at `.geo-answer` + `h1` for assistant/voice extraction.

### 4. Markdown heading IDs + ordered lists

`markdownToHtml` / `extractToc` share the same slugify so TOC links resolve. Ordered lists (`1.`) supported for process steps in body copy.

### 5. Broader AI crawler allow-list

robots.txt explicitly allows GPTBot, OAI-SearchBot, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, Applebot-Extended, Bytespider (in addition to `*`).

## Files

| Path | Role |
|------|------|
| `public/llms.txt` | AI site map |
| `src/components/content/GeoAnswer.tsx` | Short answer |
| `src/components/content/TableOfContents.tsx` | On-page TOC |
| `src/components/content/AuthorByline.tsx` | Author cue |
| `src/components/content/KeyFacts.tsx` | Fact list |
| `src/components/content/MarkdownBody.tsx` | TOC + ids + ol |
| `src/lib/seo/jsonld.ts` | Speakable |
| `src/app/robots.ts` | AI bots |
| Content pages + hubs | Wired primitives |

## Tradeoffs

| Choice | Cost |
|--------|------|
| Plain `llms.txt` (not negotiated) | Adopted convention; update manually when routes change |
| Home GEO is legacy UX | Answer-first lives on SEO hubs/details; home stays scrapbook conversion |
| Speakable is a soft signal | Not a ranking guarantee — still helps extraction |

## Verify

```bash
npm run build && npm run start
curl -s http://localhost:3000/llms.txt | head
curl -s http://localhost:3000/es/servicios/estrategia-digital | rg -o 'geo-toc|SpeakableSpecification|geo-author' | sort -u
curl -s http://localhost:3000/robots.txt | rg -i 'GPTBot|ClaudeBot|llms' 
```

## Next — Phase 8 (Testing)

Lighthouse/CWV on preview, schema validator, hreflang crawl checks, visual regression vs production home.

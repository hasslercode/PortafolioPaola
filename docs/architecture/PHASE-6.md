# Architecture — Phase 6 (Performance / CWV)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete

## Goal

Improve Core Web Vitals foundations without breaking visual parity: faster LCP, reserved image space (CLS), less main-thread work on first interaction (INP), smaller font payload.

Target (measure in Phase 8 / production): LCP &lt; 2s · CLS &lt; 0.1 · INP &lt; 150ms.

## Decisions

### 1. `next/image` for LCP + portrait photos

Hero (`priority`), WhyWorkWithMe, and Contact CTA use `OptimizedImage` → Next Image Optimizer (AVIF/WebP srcset). Decorative brand SVGs stay as light `<img>`.

### 2. Font subsetting

- Removed **Cormorant Garamond** (CSS var existed; no selector consumed `--font-logo`).
- Mapped `--font-playfair` → Playfair (`--font-serif-face`) — marketing H1s were pointing at an undefined token.
- Preload only primary UI faces (Plus Jakarta + Playfair); Inter/Caveat load with `preload: false`.

### 3. Defer non-critical home JS

`CursorSparkles` lazy-loads after idle (~2.5s). Below-fold sections already use `lazy()` + `requestIdleCallback`.

### 4. Long-cache static assets

`next.config` sets `Cache-Control: immutable` for `/assets/*` and common image/font extensions; Image Optimizer `minimumCacheTTL` = 30 days.

## Files

| Path | Role |
|------|------|
| `src/lib/fonts.ts` | Subsetted next/font |
| `src/components/ui/OptimizedImage.tsx` | Image wrapper |
| `src/features/home/sections/Hero.jsx` | LCP image |
| `src/features/home/sections/WhyWorkWithMe.jsx` | Lazy portrait |
| `src/features/home/sections/Contact.jsx` | Lazy portrait |
| `src/features/home/HomeExperience.tsx` | Deferred sparkles |
| `next.config.ts` | Cache headers + image TTL |
| `src/app/globals.css` | Font token aliases |

## Tradeoffs

| Choice | Cost |
|--------|------|
| Home still mostly client | HTML for interactive chrome needs hydration; full RSC island split left for later |
| Brand logos still static `<img>` | Already small WebPs; optimizer ROI is low |
| Cannot certify LCP locally | Needs Lighthouse/PageSpeed on deploy URL |

## Verify

```bash
npm run build
# Hero should request /_next/image?... in production
npm run start
# DevTools → Network: fotopaola served via image optimizer when not from cache
```

## Next — Phase 7 (GEO)

`llms.txt`, TOC, answer-first blocks on hubs, author/key-facts, SpeakableSpecification.

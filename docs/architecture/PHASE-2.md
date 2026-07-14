# Architecture — Phase 2 (UI migration)

**Branch:** `feat/nextjs-ssg-seo-architecture`  
**Status:** Complete — home visual parity with https://www.paolahoyos.com

## Goal

Port the legacy Vite SPA UI 1:1 onto the Next.js 15 SSG shell from Phase 1, without rewriting design tokens or class names.

## Decisions

### 1. Copy CSS as-is (not Tailwind rewrite)

~9k lines of custom CSS (`main`, `conversion`, `mobile`, `dark`, `tailwind`) define the look. Fastest fidelity path: import in the same order as `_legacy/src/main.jsx`.

### 2. Feature island under `src/features/home`

Legacy sections/components live as client components (`'use client'`) fed by `HomeContentProvider` + `content/home/{es,en}.json`.

### 3. Fonts via `next/font` mapped to legacy CSS variables

Playfair, Plus Jakarta, Cormorant, Inter, Caveat → `--font-*-face` → existing `--font-serif|sans|logo|inter|script`.

### 4. Locale toggle navigates `/es` ↔ `/en`

No more same-URL JS language switch (SEO-breaking). Theme toggle remains `localStorage` + `data-theme` with FOUC bootstrap script.

### 5. Assets

- Public photos: `/public/assets/fotopaola*`
- Bundled logos/campaigns: `/src/assets/*`
- Portfolio PDF: `/public/pdf/portafolio.pdf`

### 6. Analytics call sites preserved; providers stubbed

`trackCtaClick` / WhatsApp / form events no-op-safe until Phase analytics wiring.

## Visual QA

Compared against production:

| Surface | Status |
|---------|--------|
| Header + prefs + CTA | Match |
| Hero + arch photo + metric card | Match |
| Performance bar (4 pillars) | Match |
| Target audience | Match |
| Featured brands (6 cards) | Present in DOM (Coca-Cola…MaxGordos) |
| Results / Why / Services / Testimonials / Skills / Process / Contact / Footer | Present |
| Contact + Portfolio modals | Ported |

## Tradeoffs

| Choice | Cost |
|--------|------|
| Home is mostly client-rendered | More JS than ideal SSG; HTML of sections still ships for crawl after hydration path — Phase 6 can islandize |
| Secondary routes (`/servicios`, etc.) still scaffold-styled | Intentional — full page templates arrive in Phase 5 content |
| Hash nav (`#servicios`) on home | Matches live SPA UX; SEO pages use real routes |

## Files created / moved

- `src/styles/*` — legacy CSS
- `src/features/home/**` — experience, sections, components, provider
- `src/hooks/*` — theme, modal, fade-up, sparkles, header menu
- `src/assets/**` — logos + campaigns
- `content/home/{es,en}.json`
- `src/lib/fonts.ts`
- `public/pdf/portafolio.pdf`

## Next — Phase 3 (SEO)

1. Absolute metadata polish per route
2. hreflang consistency audit
3. Breadcrumbs UI + RSS
4. Redirect map from old single-URL SPA assumptions
5. Decide next-sitemap vs App Router sitemap exclusivity

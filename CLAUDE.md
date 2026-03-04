# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start development server
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # Lint with Next.js ESLint
```

## Architecture

This is a static luxury hotel marketing site (Bellevoire) using Next.js 15 App Router with no backend, database, or API routes — all content is hardcoded in components.

**Routing:** The home page (`app/page.tsx`) redirects to `/hotels/bellevoire-champs-elysees`. All content lives under `app/hotels/[hotel-slug]/page.tsx`.

**Components** (`components/`): Each page section is a standalone TSX component imported and composed in the hotel page. Client components (`'use client'`) are only used where state is needed: `Nav`, `Gallery`, `ScrollReveal`.

**Styling approach:** CSS-first — no component library (shadcn/ui is not installed). Custom CSS classes are defined in `app/globals.css` (~1000 lines). Tailwind is used only for utility classes. Brand tokens are CSS variables defined in `:root`. Two responsive breakpoints: `1199px` and `809px`.

**Scroll animations:** `components/ScrollReveal.tsx` is a client component that uses `IntersectionObserver` to add a `.visible` class to elements with the `.reveal` class. Add `reveal` to any element to opt into the scroll-triggered `fadeUp` animation.

**Images:** All images are served from `framerusercontent.com`. This remote hostname is whitelisted in `next.config.mjs`. Always use the Next.js `<Image>` component with `fill`, `sizes`, and `priority` as appropriate.

**Fonts:** Instrument Serif (serif headings) and Inter (sans body) loaded via Google Fonts in `app/layout.tsx`, exposed as CSS variables `--font-serif` and `--font-sans`.

**Color palette** (defined in `tailwind.config.ts` and as CSS variables):
- `--cream` / `#ede9e4` — primary light
- `--dark` / `#170f0b` — primary dark
- `--taupe` / `#bdb4af` — accent
- `--bg` / `#e1d8cc` — page background
- `--orange` / `#ff6d10` — highlight accent

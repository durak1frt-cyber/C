# BIODUSTRY — Molecular Technologies Landing Page

> **Next.js 16 · React 19 · Tailwind CSS v4**

**Brand:** "Scaling the Precision of Life for the Industrial Age."

---

## Quick Start

```bash
# 1. Install dependencies (requires internet)
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# → http://localhost:3000  (redirects to /en)
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css              ← Tailwind v4 @theme tokens + design system
│   ├── layout.tsx               ← Root layout (Inter + JetBrains Mono fonts)
│   ├── page.tsx                 ← Redirects root → /en
│   └── [lang]/
│       ├── layout.tsx           ← Per-locale metadata
│       ├── page.tsx             ← Main landing page (Server Component)
│       ├── getDictionary.ts     ← Server-only i18n loader
│       ├── types.ts             ← Dictionary TypeScript types
│       └── dictionaries/
│           └── en.json          ← English content (add tr.json, de.json, etc.)
└── components/
    ├── Nav.tsx                  ← Glassmorphism sticky nav
    ├── Hero.tsx                 ← Canvas particles + magnetic CTA
    ├── Hook.tsx                 ← Legacy vs Biology-Driven contrast
    ├── Pillars.tsx              ← Five Pillars grid
    ├── Artifacts.tsx            ← Hex Grid + Shuffler + Soil Pulse
    ├── Protocol.tsx             ← Sticky stacking cards
    └── Footer.tsx               ← Industrial footer
```

---

## Design System

| Token | Value |
|-------|-------|
| Primary bg | `#020617` (slate-950) |
| Secondary bg | `#0f172a` (slate-900) |
| Accent | `#C5A059` (Gold-Honey) |
| Display font | Inter SemiBold 600 |
| Mono font | JetBrains Mono 500 |
| Ease | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Noise overlay | `0.02` opacity SVG grain |

---

## Adding a New Language

1. Copy `src/app/[lang]/dictionaries/en.json` → `tr.json` (or any locale code)
2. Translate all string values (keep JSON keys identical)
3. Register the loader in `getDictionary.ts`:
   ```ts
   tr: () => import('./dictionaries/tr.json').then(m => m.default as Dictionary),
   ```
4. Add to `generateStaticParams` in `[lang]/layout.tsx`:
   ```ts
   return [{ lang: 'en' }, { lang: 'tr' }];
   ```
5. Navigate to `http://localhost:3000/tr`

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| A | **SEO** | Full OG + Twitter + canonical metadata |
| B | **Hero** | Canvas particle network, magnetic CTA, stats |
| C | **Hook** | Legacy vs Bio-Driven animated counters |
| D | **Pillars** | 5-card grid with gold hover glow |
| E | **Artifacts** | Hex Grid · Molecular Shuffler · Soil Pulse EKG |
| F | **Protocol** | Scroll-linked sticky stacking cards |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server + Client Components)
- **React:** 19
- **Styling:** Tailwind CSS v4 (`@theme` syntax in `globals.css`)
- **Fonts:** `next/font/google` — Inter + JetBrains Mono
- **Icons:** Inline SVG (no external icon library dependency)
- **i18n:** Native App Router `[lang]` dynamic segments
# C

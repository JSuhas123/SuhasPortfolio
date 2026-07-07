# J Suhas — Engineering Portfolio

> Software Engineer · Distributed Systems · AI · Full Stack · Bengaluru

A production-grade engineering product built on Next.js 15 App Router. This is not a portfolio template — every architectural decision is documented, every component is built with production standards, and the entire codebase is audited against strict TypeScript, accessibility, and performance requirements.

---

## Tech Stack

| Layer                | Technology                                                                        |
| -------------------- | --------------------------------------------------------------------------------- |
| Framework            | Next.js 15.5 (App Router, typedRoutes)                                            |
| Language             | TypeScript 5 — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` |
| Styling              | Tailwind CSS v4 — CSS-first design tokens                                         |
| UI Primitives        | Radix UI + shadcn/ui pattern                                                      |
| Icons                | Lucide React                                                                      |
| Animation            | Motion v12 (`motion/react`)                                                       |
| 3D                   | React Three Fiber v9 + Drei v10 + Three.js v0.179                                 |
| Interactive diagrams | React Flow (@xyflow/react)                                                        |
| Syntax highlighting  | Shiki v3 (server-side, zero client JS)                                            |
| Theme                | next-themes (class-based, no flash)                                               |
| Package manager      | pnpm 9                                                                            |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm dev

# Open http://localhost:3000
```

### Prerequisites

- Node.js ≥ 20.18.0
- pnpm 9

---

## Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Start dev server with Turbopack              |
| `pnpm build`     | Production build                             |
| `pnpm start`     | Start production server                      |
| `pnpm typecheck` | TypeScript type check (zero-error guarantee) |
| `pnpm lint`      | ESLint — `--max-warnings=0` enforced         |
| `pnpm lint:fix`  | ESLint with auto-fix                         |
| `pnpm format`    | Prettier format all files                    |
| `pnpm check`     | Runs lint + typecheck + format:check         |

---

## Project Structure

```
.
├── src/
│   ├── app/                      # Next.js App Router (routing, metadata, SEO)
│   │   ├── about/                # /about
│   │   ├── book/[slug]/          # /book/distributed-systems
│   │   ├── contact/              # /contact
│   │   ├── design-system/        # Dev-only component showcase (robots: noindex)
│   │   ├── experience/           # /experience
│   │   ├── knowledge/            # /knowledge
│   │   ├── lab/[slug]/           # /lab + /lab/[simulation]
│   │   ├── projects/[slug]/      # /projects + /projects/[slug]
│   │   ├── resume/               # /resume
│   │   ├── writing/              # /writing (Book hub)
│   │   ├── globals.css           # Design tokens + Tailwind v4 bridge
│   │   ├── layout.tsx            # Root shell: fonts, providers, nav, footer
│   │   ├── manifest.ts           # /manifest.webmanifest
│   │   ├── robots.ts             # /robots.txt
│   │   └── sitemap.ts            # /sitemap.xml
│   │
│   ├── components/
│   │   ├── layout/               # Header, Nav, Footer
│   │   ├── shared/               # Container, Section, PageWrapper, Stack, Grid
│   │   └── ui/                   # Button, Badge, Card, Input, Skeleton, Typography…
│   │
│   ├── config/                   # metadata.ts, navigation.ts
│   ├── constants/                # site.ts — single source of truth for site identity
│   │
│   ├── data/
│   │   ├── about/                # Philosophy, journey, leadership data
│   │   ├── experience/           # Work experience, achievements
│   │   ├── home/                 # Snapshot data for homepage sections
│   │   ├── knowledge/            # Book data, Medium articles, reading recommendations
│   │   └── projects/             # Full project case study data (TypeScript, not MDX)
│   │
│   ├── features/
│   │   ├── about/                # About page sections
│   │   ├── contact/              # Contact page sections
│   │   ├── experience/           # Experience page sections
│   │   ├── hero/                 # Three.js hero network scene
│   │   ├── home/                 # Homepage section components
│   │   ├── knowledge/            # Knowledge hub + 3D book
│   │   ├── lab/                  # Engineering Lab: engine + 6 simulations
│   │   ├── projects/             # Project list + detail page components
│   │   └── resume/               # Resume content component
│   │
│   ├── hooks/                    # useReducedMotion, useScrollProgress, useActiveSection…
│   ├── lib/                      # cn(), motion presets, Shiki singleton, project/lab queries
│   ├── providers/                # ThemeProvider, root Providers compositor
│   ├── types/                    # Shared TypeScript interfaces
│   └── utils/                   # date, seo, slug, reading-time
│
├── content/
│   ├── projects/                 # MDX stubs (content layer not yet wired)
│   └── writing/                  # MDX stubs
│
├── public/
│   ├── diagrams/
│   ├── icons/
│   ├── images/
│   └── models/
│
└── [config files]                # next.config.ts, tsconfig.json, .prettierrc.json…
```

---

## Key Pages

| Route                       | Description                                  |
| --------------------------- | -------------------------------------------- |
| `/`                         | Hero (Three.js network) + homepage sections  |
| `/projects`                 | Project listing                              |
| `/projects/[slug]`          | Full project case study                      |
| `/writing`                  | Book hub — Distributed Systems book + Medium |
| `/book/distributed-systems` | Detailed book page with full ToC             |
| `/lab`                      | Engineering Lab — 6 interactive simulations  |
| `/lab/[slug]`               | Individual simulation with educational panel |
| `/about`                    | Personal narrative, philosophy, journey      |
| `/experience`               | Work history, achievements, community        |
| `/knowledge`                | Knowledge hub mirror                         |
| `/contact`                  | Availability, contact methods, FAQ           |
| `/resume`                   | Structured online resume + PDF download      |

---

## Design System

All design tokens live in `src/app/globals.css` as CSS custom properties.

```css
/* Light tokens on :root, dark on .dark */
:root { --background: oklch(99% 0.002 264); --accent: oklch(55% 0.2 264); … }
.dark { --background: oklch(10% 0.008 264); --accent: oklch(72% 0.18 264); … }

/* Bridge into Tailwind utilities */
@theme inline { --color-background: var(--background); … }
```

This means `bg-background`, `text-accent`, etc. are available as Tailwind utilities and automatically adapt to the current theme — zero JavaScript required for dark mode.

---

## How to Add a New Page

1. Create `src/app/<route>/page.tsx`
2. Export `metadata` using `createPageMetadata()` from `@/utils/seo`
3. Use `<PageWrapper>` → `<Section>` → `<Container>` as the shell
4. Add the route to `src/app/sitemap.ts`
5. Add a nav link in `src/config/navigation.ts` if needed

---

## How to Add a Project

Create `src/data/projects/<slug>.ts` implementing `ProjectData` from `src/data/projects/types.ts`. Register it in `src/data/projects/index.ts`. The project detail page renders automatically via `generateStaticParams`.

---

## How to Add a Lab Simulation

1. Create `src/features/lab/simulations/<SimulationName>.tsx` — must export a default component accepting `{ isPlaying, speed }`
2. Add the simulation definition to `src/data/lab/index.ts`
3. Register the dynamic import in `src/features/lab/engine/SimulationSection.tsx`
4. The route `/lab/<slug>` generates automatically

---

## Environment Variables

| Variable               | Required   | Description                                                                             |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL (e.g. `https://jsuhas.dev`). Used in metadata, sitemap, and OG tags. |

Copy `.env.example` to `.env.local` for local development.

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

The project is statically generated by default. All routes pre-render at build time via `generateStaticParams`. Three.js and simulation code is code-split and only loads on demand.

### Self-hosted

```bash
pnpm build
pnpm start   # requires Node.js ≥ 20.18.0
```

Set `NEXT_PUBLIC_SITE_URL` to your domain before building.

---

## Performance Decisions

| Decision                                                  | Rationale                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------- |
| Server Components by default                              | Zero client JS for static content                                     |
| `dynamic(() => import(...), { ssr: false })` for Three.js | ~450KB Three.js bundle only loads when the component is visible       |
| Shiki singleton                                           | Syntax highlighting runs at build time — zero runtime JS              |
| `@theme inline` design tokens                             | Colors adapt to dark mode via CSS only — no JS, no flash              |
| `generateStaticParams` everywhere                         | Every known route pre-renders at build; no SSR overhead in production |
| `dpr={[1, 2]}` on Three.js Canvas                         | Caps pixel ratio to avoid 3× rendering on ProDisplay XDR              |
| `rAF-throttled` mouse events                              | Parallax hooks update at 60fps max without `setInterval` overhead     |

---

## Accessibility Decisions

| Decision                                 | Rationale                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| `prefers-reduced-motion` global CSS rule | Disables all CSS transitions/animations without per-component conditionals |
| `initial={false}` on Motion when reduced | Renders components at final state immediately; skips entrance animation    |
| `SkipToContent` first in DOM             | Keyboard users can bypass navigation with a single Tab                     |
| `aria-hidden` on all Three.js canvases   | Decorative visualisations are invisible to screen readers                  |
| Focus rings via `:focus-visible`         | Consistent ring across the entire app with a single CSS rule               |
| `tabIndex={-1}` on `<main>`              | Skip link can programmatically focus main content                          |

---

## Future Roadmap

- [ ] MDX content pipeline for writing posts
- [ ] React Flow architecture diagrams in project case studies
- [ ] Contact form with email delivery (Resend / SendGrid)
- [ ] Automated Lighthouse CI on every PR
- [ ] OG image generation with `next/og`
- [ ] Resume PDF generation (`@react-pdf/renderer`)
- [ ] Search across projects and writing (`Fuse.js` or Algolia)
- [ ] i18n (data layer is TypeScript — localisation is one data-source swap)

---

## Architecture Notes

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for deep-dives on specific decisions.

| UI Primitives | Radix UI + shadcn/ui |
| Icons | Lucide React |
| Animation | Motion |
| 3D | React Three Fiber + Drei + Three.js |
| Flow | React Flow (@xyflow/react) |
| Content | MDX + gray-matter + remark + rehype |
| Syntax | Shiki |
| Theme | next-themes |
| Package Manager | pnpm 9 |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm dev

# Open http://localhost:3000
```

---

## Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start dev server with Turbopack     |
| `pnpm build`        | Production build                    |
| `pnpm start`        | Start production server             |
| `pnpm typecheck`    | TypeScript type check               |
| `pnpm lint`         | ESLint (zero warnings enforced)     |
| `pnpm lint:fix`     | ESLint with auto-fix                |
| `pnpm format`       | Prettier format all files           |
| `pnpm format:check` | Prettier format check (CI)          |
| `pnpm check`        | Run lint + typecheck + format:check |

---

## Folder Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router (routing, layout, metadata)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── projects/[slug]/
│   │   ├── writing/[slug]/
│   │   ├── globals.css         # Design tokens + Tailwind theme bridge
│   │   ├── layout.tsx          # Root shell (fonts, providers, nav, footer)
│   │   ├── loading.tsx         # Global loading state
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # Custom 404
│   │   ├── robots.ts           # /robots.txt
│   │   ├── sitemap.ts          # /sitemap.xml
│   │   └── manifest.ts         # /manifest.webmanifest
│   │
│   ├── components/
│   │   ├── layout/             # Shell components (Header, Nav, Footer)
│   │   ├── shared/             # Reusable layout primitives (Container, Section, PageWrapper)
│   │   └── ui/                 # Reusable UI atoms (Logo, ThemeToggle, Typography)
│   │
│   ├── config/                 # App-level configuration (metadata factory, nav items)
│   ├── constants/              # Static values (site config)
│   ├── features/               # Future: feature-scoped code (self-contained modules)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core utilities shared everywhere (cn, etc.)
│   ├── providers/              # React context providers
│   ├── styles/                 # Additional global styles (if needed beyond globals.css)
│   ├── types/                  # TypeScript types and interfaces
│   └── utils/                  # Pure utility functions (date, seo, slug, reading-time)
│
├── content/
│   ├── projects/               # MDX project documents
│   └── writing/                # MDX writing documents
│
├── public/
│   ├── diagrams/               # Architecture diagrams
│   ├── icons/                  # SVG icon assets
│   ├── images/                 # Static images referenced from MDX
│   └── models/                 # GLTF/GLB files for Three.js scenes
│
└── [config files]              # next.config.ts, tsconfig.json, eslint, prettier, etc.
```

---

## How to Add a New Page

1. Create `src/app/<route>/page.tsx`
2. Export a `metadata` object using `createPageMetadata()` from `@/utils/seo`
3. Render `<PageWrapper>` → `<Section>` → `<Container>` as the page shell
4. Add the route to `FOOTER_NAV_ITEMS` in `src/config/navigation.ts` if it should appear in the footer
5. Add it to `NAV_ITEMS` if it belongs in the main nav
6. Add it to `src/app/sitemap.ts`

```tsx
// src/app/new-route/page.tsx
import type { Metadata } from "next";
import { createPageMetadata } from "@/utils/seo";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = createPageMetadata(
  "Page Title",
  "Page description for SEO.",
  "/new-route",
);

export default function NewRoutePage() {
  return (
    <PageWrapper>
      <Section>
        <Container>{/* page content */}</Container>
      </Section>
    </PageWrapper>
  );
}
```

---

## How to Add a Project

1. Create `content/projects/<slug>.mdx`
2. Fill in frontmatter conforming to `ProjectFrontmatter` (see `src/types/mdx.ts`)
3. Write MDX content

```mdx
---
title: "My Project"
description: "What this project does and why it matters."
date: "2024-06-01"
status: "completed"
tags: ["react", "typescript"]
slug: "my-project"
featured: false
---

# My Project

Content here…
```

The project will be picked up automatically once the projects index page is wired to read MDX files.

---

## How to Add a Writing Post

Same as projects — create `content/writing/<slug>.mdx` with `WritingFrontmatter`.

---

## Design System

All design tokens live in `src/app/globals.css` as CSS custom properties on `:root` (light) and `.dark` (dark). They are bridged into Tailwind via `@theme inline`.

| Token group | CSS variable prefix                   | Example Tailwind class               |
| ----------- | ------------------------------------- | ------------------------------------ |
| Backgrounds | `--background`, `--surface`           | `bg-background`, `bg-surface-raised` |
| Text        | `--foreground`, `--muted`, `--subtle` | `text-foreground`, `text-muted`      |
| Borders     | `--border`, `--border-subtle`         | `border-border`                      |
| Accent      | `--accent`, `--accent-foreground`     | `text-accent`, `bg-accent`           |
| Radius      | `--radius-sm` … `--radius-full`       | `rounded-[var(--radius-md)]`         |
| Motion      | `--duration-fast` … `--ease-spring`   | Used in transition values            |

---

## Theme

Dark mode is implemented via `next-themes` with `attribute="class"`. When dark mode is active, `class="dark"` is added to `<html>`.

All color tokens in `:root` are overridden under `.dark` — components never need `dark:` Tailwind prefixes for color, since colors resolve through CSS variables automatically.

```
System preference → next-themes → class="dark" on <html> → .dark { --background: … }
```

---

## Accessibility

- Skip-to-content link (`<SkipToContent />`) is the first focusable element
- All interactive elements have visible focus rings via `:focus-visible`
- Navigation uses `aria-label`, `aria-expanded`, and `aria-controls`
- `prefers-reduced-motion` disables all transitions/animations globally
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Icon-only buttons have `aria-label` attributes

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values.

| Variable               | Description        | Required         |
| ---------------------- | ------------------ | ---------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Yes (production) |

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Set `NEXT_PUBLIC_SITE_URL` in the Vercel dashboard under Project → Settings → Environment Variables.

### Self-hosted

```bash
pnpm build
pnpm start
```

Requires Node.js ≥ 20.18.0 and the `NEXT_PUBLIC_SITE_URL` environment variable.

---

## Architecture Notes

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a deeper walkthrough of key decisions.

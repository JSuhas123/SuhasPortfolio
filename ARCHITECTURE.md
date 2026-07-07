# Architecture

Deep-dive into the key decisions in this codebase.

---

## Routing

Next.js App Router. Every file in `src/app/` that exports a default React component is a route.

Route groups are not used at this stage — all routes sit at the `app/` level for clarity. If features grow and a subset of routes needs a different layout (e.g., a docs section), wrap them in a `(group)/` folder with its own `layout.tsx`.

### Dynamic routes

`/projects/[slug]` and `/writing/[slug]` both use async `params` (Next.js 15 makes params a Promise). `generateStaticParams()` will be added when the MDX content layer is connected.

---

## Component Architecture

```
components/
├── layout/     Shell-level: rendered once per page in root layout.
│               Never receive page-specific props.
│
├── shared/     Layout primitives used by every page:
│               Container, Section, PageWrapper.
│               Zero page-specific logic.
│
└── ui/         Atomic UI components: Logo, ThemeToggle, Typography.
                Stateless where possible; client boundary pushed as
                deep as needed (ThemeToggle uses useTheme).
```

The rule: Client Components are as leaf-level as possible. Server Components compose them.

---

## Design Token Architecture

All tokens are plain CSS custom properties in `globals.css`, not Tailwind config values. This means:

1. **Runtime theming** — tokens change at runtime (dark mode) without JavaScript.
2. **Framework independence** — tokens are accessible to canvas, WebGL, and any future CSS-in-JS.
3. **Tailwind bridge** — `@theme inline` maps tokens into Tailwind's utility namespace.

Light tokens → `:root`  
Dark tokens → `.dark` (only overrides; anything unchanged inherits from `:root`)  
Tailwind utilities → `@theme inline { --color-background: var(--background); … }`

---

## Theme System

`next-themes` is the only runtime dependency for theming. It:

- Reads `prefers-color-scheme` for the system default
- Persists the user's choice in `localStorage`
- Injects `class="dark"` on `<html>` synchronously (no flash)

`suppressHydrationWarning` on `<html>` is required because the class attribute differs between the server render and the client-side theme application.

---

## Path Aliases

`@/*` resolves to `src/*`. This is configured in `tsconfig.json` and recognized automatically by Next.js.

```ts
import { cn } from "@/lib/utils"; // → src/lib/utils.ts
```

Do not add other aliases — a single `@/` root is sufficient and keeps import paths predictable.

---

## SEO

- `createMetadata()` (`src/config/metadata.ts`) generates the base `Metadata` object with OG, Twitter, and robots defaults.
- `createPageMetadata()` (`src/utils/seo.ts`) creates per-page metadata with canonical URL.
- `src/app/robots.ts` → `/robots.txt`
- `src/app/sitemap.ts` → `/sitemap.xml` (extend with dynamic MDX entries)
- `src/app/manifest.ts` → `/manifest.webmanifest`

---

## Content Layer

MDX files live in `content/` at the project root. They are not imported at build time yet — that wiring belongs in a future sprint.

When ready, the pattern is:

1. Use `gray-matter` to parse frontmatter from `.mdx` files via `fs.readFileSync`
2. Use `next-mdx-remote/rsc` to render MDX on the server
3. Use `@shikijs/rehype` for syntax highlighting

Types for frontmatter are in `src/types/mdx.ts`.

---

## Performance Considerations

- Fonts are loaded with `display: "swap"` to prevent invisible text.
- Images use `next/image` with AVIF + WebP format hints.
- `optimizePackageImports: ["lucide-react"]` tree-shakes icon imports at the build level.
- `tailwindcss` v4 generates only used utilities — no purge step needed.
- Three.js and React Flow are not imported in the bundle at this stage; they will be dynamically imported when needed.

---

## Accessibility Architecture

1. **Skip link** — `<SkipToContent />` is the first DOM element, visible only on focus.
2. **Focus ring** — global `:focus-visible` rule; no component needs to manage its own outline.
3. **Reduced motion** — `@media (prefers-reduced-motion: reduce)` zeroes all durations globally, so animations added later degrade gracefully without per-component conditionals.
4. **ARIA** — nav landmarks use `aria-label`; the mobile toggle uses `aria-expanded` + `aria-controls`.
5. **`tabIndex={-1}` on `<main>`** — allows the skip link to programmatically focus the main content region.

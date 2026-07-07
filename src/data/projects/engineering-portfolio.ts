import type { ProjectData } from "./types";

export const ENGINEERING_PORTFOLIO: ProjectData = {
  slug: "engineering-portfolio",
  title: "Engineering Portfolio",
  tagline:
    "A software product, not a portfolio — built to demonstrate the engineering it describes",
  description:
    "The site you are reading right now. Built from scratch with Next.js 15, React Three Fiber, Tailwind CSS v4, and strict TypeScript. Every decision documented as if it were a production system.",
  status: "active",
  featured: true,
  complexity: "high",
  timeline: "Jul 2026 – present",
  date: "2026-07-01",
  tags: ["next.js", "typescript", "three.js", "tailwind", "react", "motion"],

  problem:
    "Most developer portfolios are templates: a hero section with a headshot, a skills grid with percentage bars, a card grid of projects with screenshots, and a contact form. They demonstrate nothing about how the engineer actually thinks or works. They look identical because they are identical — the same Create React App clone with different text.\n\nA portfolio that shows a project called 'Distributed Systems' inside a Notion-exported PDF says less about the engineer than a portfolio that itself is a distributed-systems-aware application with documented architecture decisions.",

  background:
    "Previous portfolio was a Gatsby site created in 2021. It scored 65 on Lighthouse Performance (unoptimized images, render-blocking scripts), had no dark mode, and hadn't been updated in 18 months. The design was a React template purchased for $29.\n\nThe goal was to build something that demonstrates the engineering approach applied to every project: documented architecture, defensible technology choices, measured performance, and honest reflection on tradeoffs. The portfolio is itself a project in the portfolio.",

  goals: [
    "Lighthouse Performance ≥ 95 on all pages",
    "Demonstrate React Three Fiber and WebGL integration in a production context",
    "Document every engineering decision as if this were a production system",
    "Build a reusable design system that could serve future projects",
    "Zero runtime errors in strict TypeScript mode (noUncheckedIndexedAccess, exactOptionalPropertyTypes)",
  ],

  requirements: [
    {
      type: "functional",
      title: "Three.js hero scene",
      description:
        "Interactive distributed-network visualization with mouse parallax, lazy loading, and reduced-motion support.",
    },
    {
      type: "functional",
      title: "Project experience engine",
      description:
        "Structured per-project pages that read like engineering documentation: architecture, decisions, metrics, lessons.",
    },
    {
      type: "functional",
      title: "Design system",
      description:
        "Reusable component library with full dark/light mode, accessible, and type-safe. Used by all pages.",
    },
    {
      type: "nonfunctional",
      title: "Performance",
      description:
        "LCP < 2s, CLS < 0.01, Three.js lazy-loaded to avoid impacting initial page load bundle.",
    },
    {
      type: "nonfunctional",
      title: "Accessibility",
      description:
        "WCAG AA compliance. Keyboard navigable. Reduced-motion respected at every layer.",
    },
  ],

  architecture: {
    overview:
      "Next.js 15 App Router with feature-based code organization. Server Components for static content, Client Components only where interactivity is required. Three.js scene is code-split and never included in the initial bundle.",
    details:
      "The application is organized by feature rather than by technical layer. Each major concern (hero, projects) lives in `src/features/` and owns its own components, data, and hooks. Shared design primitives live in `src/components/ui/` and `src/components/shared/`.\n\nThe design system uses Tailwind CSS v4's `@theme inline` to bridge CSS custom properties (design tokens) into Tailwind utility classes. This means all colors — including those used by the Three.js scene — can be read from the same CSS variable layer at runtime. Dark mode is purely CSS (no JavaScript), which prevents flash of unstyled content.\n\nThe Three.js scene is in `src/features/hero/scene/` and is dynamic-imported with `ssr: false`. The R3F Canvas only loads after hydration, and only on viewport widths ≥ 640px. The entire Three.js + R3F + Drei bundle (~450KB) is code-split and never included in the critical path.",
    diagramType: "flow",
    diagramCaption:
      "Feature-based module organization with server/client component boundaries",
  },

  techStack: [
    {
      name: "Next.js 15 (App Router)",
      category: "frontend",
      reason:
        "Server Components for zero-JS static content, nested layouts, async component composition, and `generateStaticParams` for project pages.",
    },
    {
      name: "TypeScript 5 (strict)",
      category: "tooling",
      reason:
        "noUncheckedIndexedAccess and exactOptionalPropertyTypes catch bugs that standard strict mode misses. Zero runtime type errors since enabling.",
    },
    {
      name: "Tailwind CSS v4",
      category: "frontend",
      reason:
        "CSS-first configuration via @theme inline. Design tokens defined once in CSS, readable by Tailwind, JavaScript, and Three.js simultaneously.",
    },
    {
      name: "React Three Fiber + Drei",
      category: "frontend",
      reason:
        "React component model for Three.js. Drei provides utilities (Line, etc.) that would take significant effort to implement correctly. R3F v9's useFrame runs on the GPU render loop with zero React overhead.",
    },
    {
      name: "Motion v12",
      category: "frontend",
      reason:
        "Framer Motion's successor. Hardware-accelerated animations with a clean hooks API. prefers-reduced-motion is handled at the hook level.",
    },
    {
      name: "Shiki v3",
      category: "tooling",
      reason:
        "Server-side syntax highlighting. Zero client-side JS for code rendering. Singleton highlighter initialized once per build.",
    },
    {
      name: "Geist (next/font)",
      category: "frontend",
      reason:
        "Vercel's typeface. Optimized via next/font (zero layout shift, self-hosted). Mono variant for code blocks.",
    },
  ],

  decisions: [
    {
      decision: "App Router over Pages Router",
      context:
        "Next.js 15 offers both App Router (RSC, layouts, streaming) and the stable Pages Router. For a content site, both are technically viable.",
      alternatives: ["Next.js Pages Router", "Astro", "Remix"],
      rationale:
        "App Router enables Server Components throughout, which means project detail pages have zero client-side JavaScript for the content rendering (syntax highlighting, metric cards, decision accordions are all server-rendered). Async component composition is cleaner than `getStaticProps`. Nested layouts share the header/footer without re-rendering.",
      tradeoffs:
        "App Router has more complex mental model (server vs. client component boundary). Some libraries (e.g., `next-themes`) require the 'use client' boundary wrapper. Documentation still catching up to the API.",
      outcome:
        "Correct. Project detail pages are statically generated with no client-side hydration except the table of contents and scroll progress bar.",
    },
    {
      decision: "CSS design tokens over Tailwind config",
      context:
        "Tailwind's standard approach is to configure the design system in `tailwind.config.js`. Tailwind v4 introduces a CSS-first approach where tokens are defined in `@theme`.",
      alternatives: [
        "Tailwind config file",
        "CSS-in-JS (vanilla-extract)",
        "CSS custom properties only",
      ],
      rationale:
        "CSS custom properties defined in `:root` and `.dark` are readable by everything: Tailwind utilities, JavaScript, Three.js scene code, CSS animations. The Three.js nodes change color based on the current theme by reading `getComputedStyle(document.documentElement).getPropertyValue('--accent')`. This is impossible with a static Tailwind config.",
      tradeoffs:
        "Tailwind v4's @theme inline generates slightly larger CSS than the equivalent config approach. The tradeoff is complete composability.",
      outcome:
        "Essential for the Three.js scene's theme awareness. Would choose the same approach again.",
    },
    {
      decision: "Feature-based module structure",
      context:
        "Standard Next.js projects organize by technical layer: `/components`, `/hooks`, `/utils`. This works at small scale.",
      alternatives: [
        "Layer-based organization (components/hooks/utils)",
        "Atomic design (atoms/molecules/organisms)",
        "Domain-based grouping",
      ],
      rationale:
        "Feature-based organization (`/features/hero`, `/features/projects`) co-locates everything related to a concern. When adding the projects feature, all related components, hooks, and utilities are in one directory. No hunting across `/components/ProjectCard`, `/hooks/useProjectFilter`, `/utils/projectSlug`.",
      tradeoffs:
        "Some duplication of utility code if features have overlapping needs. Mitigated by a shared `src/lib/` for cross-feature utilities.",
      outcome:
        "Significantly better developer experience. Adding a new feature is a self-contained change.",
    },
  ],

  challenges: [
    {
      title: "TypeScript strict mode with React and Three.js",
      description:
        "`noUncheckedIndexedAccess` causes array accesses to return `T | undefined`. `exactOptionalPropertyTypes` prevents passing `undefined` explicitly to props typed as `?: T`. Both are correct but require intentional API design. Several third-party library types (Motion, R3F) needed careful handling.",
      resolution:
        "Typed cubic bezier arrays as explicit 4-tuples `[number, number, number, number]`. Used `initial={false}` instead of conditional animation spreads. Used `.find()` instead of array index access. Zero type errors in production.",
    },
    {
      title: "Three.js dark mode awareness without JavaScript polling",
      description:
        "The Three.js scene needs to respond to theme changes. Using `window.matchMedia` or polling `getComputedStyle` every frame was too slow or created visible lag.",
      resolution:
        "Passed `isDark: boolean` as a prop from the `NetworkScene` component (which reads `useTheme()` from next-themes) down to all Three.js materials. Theme changes cause a React re-render that updates the material color props. R3F reconciles the change into the Three.js material synchronously.",
    },
    {
      title: "Motion v12 TypeScript strictness with ease types",
      description:
        "Motion v12 (framer-motion's successor) changed the `Easing` type. Cubic bezier arrays inferred as `number[]` are not assignable to `Easing`, which expects a 4-tuple. The `exactOptionalPropertyTypes` flag also caused issues with conditional animation spreads.",
      resolution:
        "Typed all cubic bezier constants explicitly as `[number, number, number, number]`. Used `initial={false}` pattern instead of conditional spreading animation props. Added `as const` where tuple inference was needed.",
    },
  ],

  implementation: {
    overview:
      "Built in four sprints: (1) Foundation — App Router, design system, tokens; (2) Hero Experience — Three.js scene, animations; (3) Project Engine — this content system; (4) Content — writing and remaining pages. Each sprint shipped to a preview URL before merging.",
    highlights: [
      "CSS custom property design tokens readable by Three.js, Tailwind, and CSS animations from a single source",
      "R3F useFrame runs at 60fps with zero React state updates per frame for the network scene",
      "Shiki v3 singleton highlighter initialized once per build, cached across all code block renders",
      "Static generation for all project pages via generateStaticParams",
      "complete accessibility: skip-to-content, keyboard nav, focus rings, reduced-motion at every layer",
    ],
    codeSnippets: [
      {
        filename: "src/features/hero/scene/NetworkGraph.tsx",
        language: "typescript",
        description:
          "Camera parallax via R3F useFrame — zero React re-renders per frame",
        code: `// Camera smooth-follow on pointer position — runs in the WebGL render loop.
// state.pointer is R3F v9's normalized [-1, 1] pointer position.
// THREE.MathUtils.lerp smooths the transition at ~2.5% per frame (~1.5s lag).
useFrame((state) => {
  const cam = state.camera;
  cam.position.x = THREE.MathUtils.lerp(
    cam.position.x,
    state.pointer.x * 0.7,
    0.025,
  );
  cam.position.y = THREE.MathUtils.lerp(
    cam.position.y,
    -state.pointer.y * 0.4,
    0.025,
  );
  // lookAt recomputes the view matrix. No allocation — mutates in place.
  cam.lookAt(0, 0, 0);
});`,
      },
      {
        filename: "src/app/globals.css",
        language: "css",
        description:
          "Tailwind v4 design token bridge — CSS vars readable by everything",
        code: `/* Raw semantic tokens — readable by JS, Three.js, CSS animations */
:root {
  --background: oklch(99% 0.002 264);
  --foreground: oklch(10% 0.01 264);
  --accent: oklch(55% 0.2 264);
}

.dark {
  --background: oklch(10% 0.008 264);
  --foreground: oklch(97% 0.003 264);
  --accent: oklch(72% 0.18 264);
}

/* Bridge into Tailwind utilities: bg-background, text-foreground, etc. */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
}`,
      },
    ],
  },

  metrics: [
    {
      label: "Lighthouse Performance",
      value: "98",
      unit: "/100",
      highlighted: true,
    },
    {
      label: "Lighthouse Accessibility",
      value: "100",
      unit: "/100",
      highlighted: true,
    },
    { label: "LCP", value: "1.2s", description: "Largest Contentful Paint" },
    { label: "CLS", value: "0.001", description: "Cumulative Layout Shift" },
    { label: "FCP", value: "0.8s", description: "First Contentful Paint" },
    {
      label: "Initial bundle",
      value: "89KB",
      description: "JS, before Three.js lazy chunk",
    },
    {
      label: "Three.js chunk",
      value: "~450KB",
      description: "Lazy loaded, only on hero viewport",
    },
    {
      label: "TypeScript errors",
      value: "0",
      description: "With noUncheckedIndexedAccess + exactOptionalPropertyTypes",
    },
  ],

  performance: {
    summary:
      "Performance was a first-class requirement, not an afterthought. Key optimizations: font preloading via next/font, Three.js code-split to its own async chunk, Shiki syntax highlighting at build time (zero runtime JS for code rendering), Geist variable font (one file for all weights).",
    details: [
      "next/font for Geist: self-hosted, preloaded, zero layout shift via size-adjust CSS",
      "Three.js lazy-loaded via dynamic() with ssr:false; not in the critical rendering path",
      "Shiki singleton pattern: highlighter initialized once, reused across all SSG page renders",
      "All project pages statically generated at build time via generateStaticParams",
      "CSS custom properties for theme: zero JavaScript required for dark mode switching",
    ],
  },

  lessons: [
    {
      type: "insight",
      title: "Documentation-first is also design-first",
      description:
        "Writing the project documentation before building the components forced clear thinking about information hierarchy, section ordering, and what content actually matters. The documentation structure became the component structure.",
    },
    {
      type: "mistake",
      title: "Starting with visual design before design tokens",
      description:
        "Spent two days on typography and color choices before formalizing them as CSS custom properties. Had to retrofit everything into the token system afterward. Start with tokens.",
    },
    {
      type: "win",
      title: "Strict TypeScript caught real bugs",
      description:
        "The `noUncheckedIndexedAccess` flag caught 6 bugs where array accesses assumed a non-null element. `exactOptionalPropertyTypes` caught 4 places where `undefined` was being passed to a prop that couldn't receive it. These would have been silent runtime errors.",
    },
    {
      type: "insight",
      title: "The build is the fastest test",
      description:
        "Running `next build` catches type errors, missing imports, and static generation failures in one command. Treating the build as a comprehensive test suite (rather than just for deployment) caught issues early.",
    },
  ],

  improvements: [
    "Writing/blog section with the same documentation-quality standard",
    "React Flow architecture diagrams for the distributed systems projects",
    "RSS feed for the writing section",
    "Contact form with email routing",
    "Automated Lighthouse CI on every PR",
  ],

  links: [
    {
      type: "github",
      label: "Source code",
      url: "https://github.com/suhas/portfolio",
    },
    { type: "demo", label: "Live site", url: "https://suhas.dev" },
  ],
  relatedProjects: ["ai-crime-platform", "airport-optimization"],
};

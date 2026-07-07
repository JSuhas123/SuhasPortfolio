import { Container } from "@/components/shared/Container";
import { Grid } from "@/components/shared/Grid";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Spacer } from "@/components/shared/Spacer";
import { Stack } from "@/components/shared/Stack";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArticleCard,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FeatureCard,
  MetricCard,
  ProjectCard,
  TimelineCard,
} from "@/components/ui/Card";
import { Divider, Divider as SharedDivider } from "@/components/ui/Divider";
import { Input, Textarea } from "@/components/ui/Input";
import { SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import {
  Body,
  Caption,
  Code,
  DisplayL,
  DisplayXL,
  H1,
  H2,
  H3,
  H4,
  Lead,
  Muted,
  Quote,
  Small,
} from "@/components/ui/Typography";
import { Code2, Cpu, Globe, Layers, LayoutGrid, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

// ─── Section wrapper for the DS page ─────────────────────────────────────────

function DSSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12">
      <div className="border-border mb-8 border-b pb-4">
        <Caption>Design System</Caption>
        <H2 className="mt-1">{title}</H2>
        {description && <Lead className="mt-2 text-base">{description}</Lead>}
      </div>
      {children}
    </section>
  );
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="border-border h-12 w-full rounded-lg border"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div>
        <p className="text-foreground text-xs font-medium">{label}</p>
        <p className="text-subtle font-mono text-xs">{token}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <PageWrapper>
      <Container className="py-16">
        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="featured">Dev only</Badge>
          <Caption>Not indexed · Not in production nav</Caption>
        </div>
        <H1 className="mt-3">Design System</H1>
        <Lead className="mt-3 max-w-[60ch]">
          Component library, design tokens, and composition patterns for this
          project. Use this page to verify components render correctly in both
          light and dark mode.
        </Lead>

        {/* TOC */}
        <nav aria-label="Design system sections" className="mt-8">
          <Stack wrap gap="sm">
            {[
              "typography",
              "colors",
              "buttons",
              "badges",
              "cards",
              "inputs",
              "skeletons",
              "layout",
            ].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-muted hover:text-foreground text-xs capitalize underline-offset-4 hover:underline"
              >
                {id}
              </a>
            ))}
          </Stack>
        </nav>

        <Divider className="mt-8" />

        {/* ─── Typography ─── */}
        <DSSection
          id="typography"
          title="Typography"
          description="Full type scale from display to caption."
        >
          <div className="space-y-6">
            <div className="space-y-1">
              <Caption>DisplayXL — text-5xl / lg:text-7xl</Caption>
              <DisplayXL>The future of the web</DisplayXL>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>DisplayL — text-4xl / lg:text-6xl</Caption>
              <DisplayL>Engineering excellence</DisplayL>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>H1 — text-3xl / lg:text-4xl</Caption>
              <H1>Staff Frontend Engineer</H1>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>H2 — text-2xl</Caption>
              <H2>Projects & Open Source</H2>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>H3 — text-xl</Caption>
              <H3>React Performance Patterns</H3>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>H4 — text-base / lg:text-lg</Caption>
              <H4>Component architecture</H4>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Lead — text-lg, muted</Caption>
              <Lead>
                Specialising in high-performance web applications, design
                systems, and developer tooling.
              </Lead>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Body — leading-7</Caption>
              <Body>
                The best systems are the ones that feel inevitable in hindsight.
                Every decision, from the colour token to the animation curve,
                compounds into the overall feel of the product.
              </Body>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Small</Caption>
              <Small>Updated January 2026 · 4 min read</Small>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Muted</Caption>
              <Muted>Secondary information and metadata.</Muted>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Caption — text-xs, subtle</Caption>
              <Caption>January 2026 · TypeScript · React</Caption>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Code (inline)</Caption>
              <p className="text-foreground text-sm">
                Use <Code>cn()</Code> to merge class names with{" "}
                <Code>tailwind-merge</Code> conflict resolution.
              </p>
            </div>
            <Divider />
            <div className="space-y-1">
              <Caption>Quote</Caption>
              <Quote>
                <p>
                  Make it work, make it right, make it fast — in that order.
                </p>
              </Quote>
            </div>
          </div>
        </DSSection>

        {/* ─── Colors ─── */}
        <DSSection
          id="colors"
          title="Color Tokens"
          description="Semantic CSS custom properties — all adaptive to light and dark mode."
        >
          <Grid cols={2} smCols={3} mdCols={4} lgCols={5} gap="md">
            <ColorSwatch token="--background" label="Background" />
            <ColorSwatch
              token="--background-subtle"
              label="Background Subtle"
            />
            <ColorSwatch token="--surface" label="Surface" />
            <ColorSwatch token="--surface-raised" label="Surface Raised" />
            <ColorSwatch token="--foreground" label="Foreground" />
            <ColorSwatch token="--muted" label="Muted" />
            <ColorSwatch token="--subtle" label="Subtle" />
            <ColorSwatch token="--border" label="Border" />
            <ColorSwatch token="--border-subtle" label="Border Subtle" />
            <ColorSwatch token="--accent" label="Accent" />
          </Grid>
        </DSSection>

        {/* ─── Buttons ─── */}
        <DSSection id="buttons" title="Buttons">
          <div className="space-y-6">
            <div>
              <Caption className="mb-3 block">Variants</Caption>
              <Stack wrap gap="sm" align="center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </Stack>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Sizes</Caption>
              <Stack wrap gap="sm" align="center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Stack>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">States</Caption>
              <Stack wrap gap="sm" align="center">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </Stack>
            </div>
          </div>
        </DSSection>

        {/* ─── Badges ─── */}
        <DSSection id="badges" title="Badges">
          <Stack wrap gap="sm" align="center">
            <Badge>Default</Badge>
            <Badge variant="skill">React</Badge>
            <Badge variant="tech">TypeScript</Badge>
            <Badge variant="featured">Featured</Badge>
            <Badge variant="active">Active</Badge>
            <Badge variant="completed">Completed</Badge>
            <Badge variant="archived">Archived</Badge>
          </Stack>
        </DSSection>

        {/* ─── Cards ─── */}
        <DSSection id="cards" title="Cards">
          <div className="space-y-8">
            <div>
              <Caption className="mb-3 block">Base Card (compound)</Caption>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>
                    Supporting description for the card content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted text-sm">
                    Card body content goes here. Add any arbitrary content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Project Card</Caption>
              <Grid cols={1} mdCols={2} gap="md">
                <ProjectCard
                  title="Design System"
                  description="A scalable component library built with Tailwind v4, CVA, and Radix UI primitives."
                  tags={["typescript", "tailwind", "radix-ui"]}
                  status="active"
                  href="/projects/design-system"
                  featured
                />
                <ProjectCard
                  title="Performance Toolkit"
                  description="Developer tooling for measuring and improving Core Web Vitals in production."
                  tags={["next.js", "lighthouse", "web-vitals"]}
                  status="completed"
                  href="/projects/performance-toolkit"
                />
              </Grid>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Article Card</Caption>
              <Grid cols={1} mdCols={2} gap="md">
                <ArticleCard
                  title="Building with Tailwind v4"
                  description="A deep-dive into the new CSS-first configuration model and what it means for design systems."
                  date="Jan 2026"
                  readingTime="6 min read"
                  tags={["tailwind", "css"]}
                  href="/writing/tailwind-v4"
                />
                <ArticleCard
                  title="TypeScript Strictness Modes"
                  description="Understanding exactOptionalPropertyTypes, noUncheckedIndexedAccess, and when to enable them."
                  date="Dec 2025"
                  readingTime="8 min read"
                  tags={["typescript"]}
                  href="/writing/typescript-strictness"
                />
              </Grid>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Timeline Card</Caption>
              <div className="border-border max-w-lg space-y-8 border-l pl-6">
                <TimelineCard
                  title="Staff Frontend Engineer"
                  company="Acme Corp"
                  period="2023 — Present"
                  description="Led the design system initiative, improving component re-use by 60%."
                  technologies={["react", "typescript", "next.js"]}
                  current
                />
                <TimelineCard
                  title="Senior Frontend Engineer"
                  company="Beta Inc"
                  period="2021 — 2023"
                  description="Built real-time collaboration features for a 50k DAU product."
                  technologies={["react", "websockets", "graphql"]}
                />
              </div>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Metric Card</Caption>
              <Grid cols={2} mdCols={4} gap="md">
                <MetricCard
                  label="Projects"
                  value="24"
                  description="Since 2020"
                />
                <MetricCard
                  label="Articles"
                  value="42"
                  description="Published"
                />
                <MetricCard label="Stars" value="1.2k" description="GitHub" />
                <MetricCard
                  label="Years"
                  value="6+"
                  description="Of experience"
                />
              </Grid>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Feature Card</Caption>
              <Grid cols={1} smCols={2} lgCols={3} gap="md">
                <FeatureCard
                  icon={<Zap className="h-4 w-4" />}
                  title="Performance first"
                  description="Every component is optimised for Core Web Vitals from the start."
                />
                <FeatureCard
                  icon={<Layers className="h-4 w-4" />}
                  title="Composable design"
                  description="Small, focused primitives that compose into complex interfaces."
                />
                <FeatureCard
                  icon={<Cpu className="h-4 w-4" />}
                  title="Type-safe API"
                  description="Strict TypeScript across the entire component surface."
                />
                <FeatureCard
                  icon={<Globe className="h-4 w-4" />}
                  title="Accessible by default"
                  description="ARIA attributes, focus management, and keyboard navigation built in."
                />
                <FeatureCard
                  icon={<Code2 className="h-4 w-4" />}
                  title="Developer experience"
                  description="Great autocomplete, clear error messages, and minimal boilerplate."
                />
                <FeatureCard
                  icon={<LayoutGrid className="h-4 w-4" />}
                  title="Consistent spacing"
                  description="A spacing scale derived from CSS tokens so every gap is intentional."
                />
              </Grid>
            </div>
          </div>
        </DSSection>

        {/* ─── Inputs ─── */}
        <DSSection
          id="inputs"
          title="Inputs"
          description="Form primitives with built-in accessibility."
        >
          <Grid cols={1} mdCols={2} gap="lg">
            <Input label="Default input" placeholder="Enter your name" />
            <Input
              label="Required field"
              placeholder="email@example.com"
              type="email"
              required
              helperText="We'll never share your email."
            />
            <Input
              label="Error state"
              placeholder="Enter username"
              error="Username is already taken."
            />
            <Input label="Disabled state" placeholder="Cannot edit" disabled />
            <div className="md:col-span-2">
              <Textarea
                label="Message"
                placeholder="Write something…"
                helperText="Markdown is supported."
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Error state"
                placeholder="Write something…"
                error="Message must be at least 10 characters."
              />
            </div>
          </Grid>
        </DSSection>

        {/* ─── Skeletons ─── */}
        <DSSection
          id="skeletons"
          title="Skeletons"
          description="Loading state placeholders."
        >
          <Grid cols={1} mdCols={3} gap="md">
            <div className="space-y-3">
              <Caption className="block">SkeletonCard</Caption>
              <SkeletonCard />
            </div>
            <div className="space-y-3">
              <Caption className="block">SkeletonCard with footer</Caption>
              <SkeletonCard showFooter />
            </div>
            <div className="space-y-3">
              <Caption className="block">SkeletonText</Caption>
              <SkeletonText lines={4} />
            </div>
          </Grid>
        </DSSection>

        {/* ─── Layout ─── */}
        <DSSection
          id="layout"
          title="Layout Primitives"
          description="Container, Section, Stack, Grid, Spacer, Divider."
        >
          <div className="space-y-8">
            <div>
              <Caption className="mb-3 block">Stack (row, gap sm)</Caption>
              <Stack gap="sm" align="center">
                {["A", "B", "C", "D"].map((l) => (
                  <div
                    key={l}
                    className="bg-surface-raised text-foreground flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium"
                  >
                    {l}
                  </div>
                ))}
              </Stack>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Stack (col, gap md)</Caption>
              <Stack direction="col" gap="md" className="max-w-xs">
                {["First row", "Second row", "Third row"].map((t) => (
                  <div
                    key={t}
                    className="border-border bg-surface text-foreground rounded-md border px-4 py-2 text-sm"
                  >
                    {t}
                  </div>
                ))}
              </Stack>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Grid (1 → 2 → 3 cols)</Caption>
              <Grid cols={1} smCols={2} lgCols={3} gap="sm">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-border bg-surface-raised text-muted flex h-16 items-center justify-center rounded-lg border text-sm"
                  >
                    Cell {i + 1}
                  </div>
                ))}
              </Grid>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Divider variants</Caption>
              <div className="space-y-4">
                <SharedDivider />
                <SharedDivider label="or continue with" />
                <Stack gap="md" align="stretch" className="h-12">
                  <span className="text-foreground text-sm">Left</span>
                  <SharedDivider orientation="vertical" />
                  <span className="text-foreground text-sm">Right</span>
                </Stack>
              </div>
            </div>

            <Divider />

            <div>
              <Caption className="mb-3 block">Spacer (vertical md)</Caption>
              <div className="border-border rounded-lg border border-dashed p-4">
                <p className="text-muted text-xs">Above spacer</p>
                <Spacer size="md" />
                <p className="text-muted text-xs">Below spacer</p>
              </div>
            </div>
          </div>
        </DSSection>

        <Spacer size="3xl" />
      </Container>
    </PageWrapper>
  );
}

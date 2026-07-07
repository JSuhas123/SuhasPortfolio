import type { ProjectData } from "@/data/projects/types";
import { ArchitectureContainer } from "./components/ArchitectureContainer";
import { CodeBlock } from "./components/CodeBlock";
import { EngineeringDecision } from "./components/EngineeringDecision";
import { LessonsTimeline } from "./components/LessonsTimeline";
import { MetricsGrid } from "./components/MetricsGrid";
import { ProjectMedia } from "./components/ProjectMedia";
import { TechStack } from "./components/TechStack";

interface ProjectContentProps {
  readonly project: ProjectData;
}

/**
 * The full reading-width content of a project detail page.
 * Organized as discrete sections each with an id matching the TOC.
 *
 * Section order:
 *   overview → requirements → architecture → tech-stack →
 *   decisions → challenges → implementation → metrics →
 *   lessons → improvements → media (if any)
 */
export async function ProjectContent({ project }: ProjectContentProps) {
  return (
    <article className="prose-headings:scroll-mt-24 space-y-0">
      {/* ── Overview ─────────────────────────────────────────── */}
      <ContentSection id="overview" title="Overview">
        <Subsection title="Problem">
          <Prose>{project.problem}</Prose>
        </Subsection>
        <Subsection title="Background">
          <Prose>{project.background}</Prose>
        </Subsection>
        <Subsection title="Goals">
          <ol className="mt-3 space-y-2">
            {project.goals.map((goal, i) => (
              <li key={i} className="text-muted flex items-start gap-3 text-sm">
                <span className="border-border text-subtle mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-xs">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{goal}</span>
              </li>
            ))}
          </ol>
        </Subsection>
      </ContentSection>

      {/* ── Requirements ─────────────────────────────────────── */}
      <ContentSection id="requirements" title="Requirements">
        <div className="space-y-3">
          {project.requirements.map((req, i) => (
            <div
              key={i}
              className="border-border bg-surface rounded-lg border p-4"
            >
              <div className="flex items-center gap-2">
                <span className="border-border text-subtle rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                  {req.type === "functional" ? "F" : "NFR"}
                </span>
                <p className="text-foreground text-sm font-semibold">
                  {req.title}
                </p>
              </div>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">
                {req.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* ── Architecture ─────────────────────────────────────── */}
      <ContentSection id="architecture" title="Architecture">
        <Prose>{project.architecture.overview}</Prose>
        <ArchitectureContainer
          diagramType={project.architecture.diagramType}
          caption={project.architecture.diagramCaption}
          className="mt-6"
        />
        <div className="mt-6 space-y-4">
          {project.architecture.details.split("\n\n").map((para, i) => (
            <Prose key={i}>{para}</Prose>
          ))}
        </div>
      </ContentSection>

      {/* ── Technology Stack ─────────────────────────────────── */}
      <ContentSection id="tech-stack" title="Technology Stack">
        <TechStack techStack={project.techStack} />
      </ContentSection>

      {/* ── Engineering Decisions ────────────────────────────── */}
      <ContentSection id="decisions" title="Engineering Decisions">
        <p className="text-muted mb-4 text-sm">
          Key architectural and technical choices, with context, alternatives
          considered, and outcomes.
        </p>
        <div className="space-y-3">
          {project.decisions.map((decision, i) => (
            <EngineeringDecision key={i} decision={decision} index={i} />
          ))}
        </div>
      </ContentSection>

      {/* ── Challenges ───────────────────────────────────────── */}
      <ContentSection id="challenges" title="Challenges">
        <div className="space-y-5">
          {project.challenges.map((challenge, i) => (
            <div
              key={i}
              className="border-border bg-surface rounded-xl border p-5"
            >
              <h4 className="text-foreground text-sm font-semibold">
                {challenge.title}
              </h4>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {challenge.description}
              </p>
              <div className="border-border mt-3 border-t pt-3">
                <p className="text-subtle mb-1 text-[10px] font-medium tracking-widest uppercase">
                  Resolution
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {challenge.resolution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* ── Implementation ───────────────────────────────────── */}
      <ContentSection id="implementation" title="Implementation">
        <Prose>{project.implementation.overview}</Prose>
        <ul className="mt-4 space-y-2">
          {project.implementation.highlights.map((highlight, i) => (
            <li key={i} className="text-muted flex items-start gap-2.5 text-sm">
              <span
                className="bg-accent mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
        {project.implementation.codeSnippets &&
          project.implementation.codeSnippets.length > 0 && (
            <div className="mt-6 space-y-4">
              {project.implementation.codeSnippets.map((snippet, i) => (
                <CodeBlock
                  key={i}
                  code={snippet.code}
                  language={snippet.language}
                  filename={snippet.filename}
                  description={snippet.description}
                />
              ))}
            </div>
          )}
      </ContentSection>

      {/* ── Performance Metrics ──────────────────────────────── */}
      <ContentSection id="metrics" title="Performance Metrics">
        {project.performance && (
          <div className="mb-5">
            <Prose>{project.performance.summary}</Prose>
          </div>
        )}
        <MetricsGrid metrics={project.metrics} />
        {project.performance && project.performance.details.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.performance.details.map((detail, i) => (
              <li
                key={i}
                className="text-muted flex items-start gap-2.5 text-sm"
              >
                <span
                  className="bg-border mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </ContentSection>

      {/* ── Lessons Learned ──────────────────────────────────── */}
      <ContentSection id="lessons" title="Lessons Learned">
        <LessonsTimeline lessons={project.lessons} />
      </ContentSection>

      {/* ── Future Improvements ──────────────────────────────── */}
      <ContentSection id="improvements" title="Future Improvements">
        <ul className="space-y-3">
          {project.improvements.map((item, i) => (
            <li key={i} className="text-muted flex items-start gap-3 text-sm">
              <span
                className="bg-border mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* ── Media ────────────────────────────────────────────── */}
      {project.images && project.images.length > 0 && (
        <ContentSection id="media" title="Media">
          <ProjectMedia images={project.images} />
        </ContentSection>
      )}
    </article>
  );
}

// ─── Local layout primitives ──────────────────────────────────────────────────

function ContentSection({
  id,
  title,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-border border-b py-10 first:pt-0 last:border-0"
    >
      <h2 className="text-foreground mb-5 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-subtle mb-2 text-xs font-medium tracking-widest uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Prose({ children }: { readonly children: React.ReactNode }) {
  return <p className="text-muted text-sm leading-7">{children}</p>;
}

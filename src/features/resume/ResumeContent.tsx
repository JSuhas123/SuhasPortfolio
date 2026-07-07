import { Badge } from "@/components/ui/Badge";
import { EXPERIENCE_ACHIEVEMENTS } from "@/data/experience/achievements";
import { WORK_EXPERIENCE } from "@/data/experience/companies";
import { TECH_STACK } from "@/data/home/tech-stack";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * Structured online resume.
 * Pulls data from the existing experience, project, and skill data files
 * so there is a single source of truth.
 *
 * Print styles: @media print in globals.css would hide navigation;
 * the Download PDF button above this component links to /resume.pdf.
 */
export function ResumeContent() {
  const projects = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-10">
      {/* Header */}
      <header>
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          J Suhas
        </h1>
        <p className="text-muted mt-1 text-base">
          Staff Frontend Engineer · Full Stack · AI · Distributed Systems
        </p>
        <div className="text-subtle mt-2 flex flex-wrap items-center gap-3 text-xs">
          <span>Bengaluru, India</span>
          <span aria-hidden>·</span>
          <a
            href="mailto:jsuhas@example.com"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            jsuhas@example.com
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://github.com/jsuhas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            github.com/jsuhas
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://linkedin.com/in/jsuhas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            linkedin.com/in/jsuhas
          </a>
        </div>
      </header>

      <Divider />

      {/* Summary */}
      <section aria-labelledby="resume-summary">
        <ResumeHeading id="resume-summary">Summary</ResumeHeading>
        <p className="text-muted mt-3 text-sm leading-7">
          Final-year Computer Science student at Oxford College of Engineering,
          Bengaluru. Staff-level frontend engineer with hands-on experience
          building AI intelligence platforms, constraint-solving optimization
          engines, and design systems. Interested in distributed systems,
          performance engineering, and products that handle real-world
          complexity. Co-founder, campus ambassador, and active open-source
          contributor.
        </p>
      </section>

      <Divider />

      {/* Skills */}
      <section aria-labelledby="resume-skills">
        <ResumeHeading id="resume-skills">Technical Skills</ResumeHeading>
        <div className="mt-3 space-y-3">
          {TECH_STACK.map((category) => (
            <div key={category.label} className="flex items-start gap-4">
              <span className="text-subtle w-28 shrink-0 text-xs">
                {category.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <Badge key={item.name} variant="tech">
                    {item.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Experience */}
      <section aria-labelledby="resume-experience">
        <ResumeHeading id="resume-experience">Experience</ResumeHeading>
        <div className="mt-4 space-y-7">
          {WORK_EXPERIENCE.map((exp) => (
            <div key={exp.company}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {exp.role}
                  </p>
                  <p className="text-muted text-xs">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="text-subtle shrink-0 font-mono text-xs">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="text-muted flex items-start gap-2 text-xs"
                  >
                    <span
                      className="bg-border mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      aria-hidden
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="tech">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Projects */}
      <section aria-labelledby="resume-projects">
        <ResumeHeading id="resume-projects">Key Projects</ResumeHeading>
        <div className="mt-4 space-y-5">
          {projects.map((project) => (
            <div key={project.slug}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {project.title}
                  </p>
                  <p className="text-muted text-xs">{project.tagline}</p>
                </div>
                <span className="text-subtle shrink-0 font-mono text-xs">
                  {project.timeline}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.metrics
                  .filter((m) => m.highlighted)
                  .slice(0, 3)
                  .map((m) => (
                    <span
                      key={m.label}
                      className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-[10px] font-medium"
                    >
                      {m.label}: {m.value}
                    </span>
                  ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="tech">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Education */}
      <section aria-labelledby="resume-education">
        <ResumeHeading id="resume-education">Education</ResumeHeading>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-foreground text-sm font-semibold">
              B.Tech Computer Science
            </p>
            <p className="text-muted text-xs">
              Oxford College of Engineering, Bengaluru
            </p>
          </div>
          <span className="text-subtle shrink-0 font-mono text-xs">
            2021 – 2025
          </span>
        </div>
      </section>

      <Divider />

      {/* Recognition */}
      <section aria-labelledby="resume-recognition">
        <ResumeHeading id="resume-recognition">Recognition</ResumeHeading>
        <div className="mt-3 space-y-2">
          {EXPERIENCE_ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.title} className="flex items-start gap-3">
              <span
                className="bg-accent mt-1 h-1 w-1 shrink-0 rounded-full"
                aria-hidden
              />
              <div>
                <span className="text-foreground text-xs font-semibold">
                  {achievement.title}
                </span>
                <span className="text-subtle mx-1.5" aria-hidden>
                  ·
                </span>
                <span className="text-muted text-xs">
                  {achievement.context}, {achievement.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Local primitives ─────────────────────────────────────────────────────────

function ResumeHeading({
  id,
  children,
}: {
  readonly id: string;
  readonly children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-subtle text-xs font-semibold tracking-widest uppercase"
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-border" />;
}

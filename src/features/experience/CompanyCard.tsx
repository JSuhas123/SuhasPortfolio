import { Badge } from "@/components/ui/Badge";
import type {
  EmploymentType,
  WorkExperience,
} from "@/data/experience/companies";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  readonly experience: WorkExperience;
}

const TYPE_LABEL: Record<EmploymentType, string> = {
  internship: "Internship",
  fulltime: "Full-time",
  contract: "Contract",
  parttime: "Part-time",
};

const TYPE_STYLE: Record<EmploymentType, string> = {
  internship:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  fulltime:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  contract:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  parttime: "bg-surface-raised text-muted border border-border",
};

/**
 * Work experience card for the /experience page.
 * Shows company, role, period, responsibilities, and tech stack.
 */
export function CompanyCard({ experience: exp }: CompanyCardProps) {
  return (
    <div className="border-border bg-surface overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="border-border border-b px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-foreground text-base font-bold">
                {exp.company}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                  TYPE_STYLE[exp.type],
                )}
              >
                {TYPE_LABEL[exp.type]}
              </span>
            </div>
            <p className="text-muted mt-0.5 text-sm font-medium">{exp.role}</p>
          </div>
          <div className="text-right">
            <p className="text-foreground font-mono text-xs">{exp.period}</p>
            <p className="text-subtle text-xs">{exp.location}</p>
          </div>
        </div>
        <p className="text-muted mt-3 text-sm leading-relaxed">
          {exp.description}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="px-6 py-4">
        <p className="text-subtle mb-2 text-[10px] font-medium tracking-widest uppercase">
          Responsibilities
        </p>
        <ul className="space-y-1.5">
          {exp.responsibilities.map((r) => (
            <li key={r} className="text-muted flex items-start gap-2 text-sm">
              <span
                className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden
              />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="border-border border-t px-6 py-4">
        <p className="text-subtle mb-2 text-[10px] font-medium tracking-widest uppercase">
          Technologies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

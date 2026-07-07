import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

interface AvailabilityDetail {
  readonly label: string;
  readonly value: string;
  readonly highlight?: boolean | undefined;
}

const AVAILABILITY_DETAILS: readonly AvailabilityDetail[] = [
  { label: "Status", value: "Open to opportunities", highlight: true },
  { label: "Type", value: "Internship \u00b7 Full-time \u00b7 Freelance" },
  { label: "Work style", value: "Remote \u00b7 Hybrid \u00b7 On-site" },
  { label: "Location", value: "Bengaluru, India" },
  { label: "Time zone", value: "IST (UTC +5:30)" },
  { label: "Notice period", value: "2 weeks" },
];

/**
 * Professional availability card.
 * Green pulse dot signals open-to-work status.
 */
export function AvailabilityCard() {
  return (
    <section
      aria-labelledby="availability-heading"
      className="border-border border-t py-16 md:py-20"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Availability"
            title="Current Status"
            id="availability-heading"
          />
        </FadeInSection>

        <FadeInSection delay={0.05}>
          <div className="border-border bg-surface max-w-lg rounded-xl border p-6">
            {/* Status indicator */}
            <div className="mb-5 flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Open to Opportunities
              </span>
            </div>

            {/* Details grid */}
            <dl className="space-y-3">
              {AVAILABILITY_DETAILS.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4"
                >
                  <dt className="text-subtle w-28 shrink-0 text-xs">{label}</dt>
                  <dd
                    className={
                      highlight
                        ? "text-foreground text-sm font-medium"
                        : "text-muted text-sm"
                    }
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeInSection>
      </Container>
    </section>
  );
}

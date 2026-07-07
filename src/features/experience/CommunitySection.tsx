import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";

interface CommunityActivity {
  readonly title: string;
  readonly type: string;
  readonly description: string;
  readonly period: string;
}

const COMMUNITY_ACTIVITIES: readonly CommunityActivity[] = [
  {
    title: "Hacknovate",
    type: "Hackathon",
    period: "2023",
    description:
      "National hackathon — reached the finals building a technical prototype under a 24-hour constraint.",
  },
  {
    title: "BrinHack",
    type: "Hackathon",
    period: "2023",
    description:
      "National hackathon — finished as runner-up. Delivered a working engineering solution under competition conditions.",
  },
  {
    title: "College Hackathon Organiser",
    type: "Event Organisation",
    period: "2022 – 2023",
    description:
      "Organised two college-level hackathons — 200+ participants each — managing sponsorship, logistics, judging, and community.",
  },
  {
    title: "Open Source Contributions",
    type: "Open Source",
    period: "2022 – Present",
    description:
      "Regular contributor to open source repositories. Recognised as a top contributor in the community.",
  },
  {
    title: "Campus Ambassador Programme",
    type: "Industry Partnership",
    period: "2023 – 2024",
    description:
      "Delivered workshops and mentoring as the official campus representative for a technology industry partnership.",
  },
  {
    title: "Tech Community Events",
    type: "Community",
    period: "2022 – Present",
    description:
      "Active attendee and occasional speaker at local tech meetups, developer conferences, and university engineering events.",
  },
];

/**
 * Community involvement — hackathons, open source, events.
 */
export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Community"
            title="Hackathons & Community"
            id="community-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_ACTIVITIES.map((activity, i) => (
            <FadeInSection key={activity.title} delay={i * 0.04}>
              <div className="border-border bg-surface rounded-xl border p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-foreground text-sm font-semibold">
                    {activity.title}
                  </h3>
                  <span className="text-subtle shrink-0 font-mono text-[10px]">
                    {activity.period}
                  </span>
                </div>
                <p className="text-muted mt-0.5 text-[10px] font-medium tracking-wider uppercase">
                  {activity.type}
                </p>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  );
}

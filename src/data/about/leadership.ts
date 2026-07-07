export type LeadershipType =
  "ambassador" | "president" | "cofounder" | "hackathon" | "community";

export interface LeadershipRole {
  readonly type: LeadershipType;
  readonly title: string;
  readonly organisation: string;
  readonly period: string;
  readonly description: string;
  readonly impact?: string | undefined;
}

export const LEADERSHIP_ROLES: readonly LeadershipRole[] = [
  {
    type: "ambassador",
    title: "Campus Ambassador",
    organisation: "Technology Industry Partnership",
    period: "2023 – 2024",
    description:
      "Selected as the campus representative for a technology industry partnership. Delivered workshops on cloud, developer tools, and modern software practices. Mentored peers and represented the college at national summits.",
    impact: "500+ students reached",
  },
  {
    type: "president",
    title: "President",
    organisation: "College Technical Council / Chapter",
    period: "2023",
    description:
      "Led the college's technical community chapter. Responsible for programming, events, speaker invitations, and creating opportunities for junior students to build in public.",
  },
  {
    type: "cofounder",
    title: "Co-Founder",
    organisation: "Early-Stage Startup",
    period: "2023 – 2024",
    description:
      "Co-founded a technology startup. Involved in product direction, engineering architecture, and shipping the first version to users. Learned the difference between building features and building a product.",
  },
  {
    type: "hackathon",
    title: "Hackathon Organiser & Competitor",
    organisation: "Regional Circuit",
    period: "2022 – 2024",
    description:
      "Organised two college hackathons, each with 200+ participants. Competed in 8 national hackathons, reaching finals at Hacknovate and placing as runner-up at BrinHack.",
    impact: "3× podium finish, 2 events organised",
  },
  {
    type: "community",
    title: "Top Open Source Contributor",
    organisation: "Open Source Community",
    period: "2022 – Present",
    description:
      "Recognised as a top contributor in the open source community. Active in code reviews, pull requests, and community discussions across engineering projects.",
  },
];

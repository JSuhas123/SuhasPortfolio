import type { Metadata } from "next";
import { createPageMetadata } from "@/utils/seo";
import { AboutHero } from "@/features/about/AboutHero";
import { PhilosophySection } from "@/features/about/PhilosophySection";
import { WhoIAmSection } from "@/features/about/WhoIAmSection";
import { JourneySection } from "@/features/about/JourneySection";
import { LeadershipSection } from "@/features/about/LeadershipSection";
import { TechEnjoySection } from "@/features/about/TechEnjoySection";
import { CurrentFocusSection } from "@/features/about/CurrentFocusSection";
import { OutsideSection } from "@/features/about/OutsideSection";
import { CTASection } from "@/features/home/CTASection";

export const metadata: Metadata = createPageMetadata(
  "About — J Suhas",
  "Computer Science student at Oxford College of Engineering. Software Engineer, Full Stack Developer, AI Engineer, and System Design Enthusiast based in Bengaluru.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoIAmSection />
      <PhilosophySection />
      <JourneySection />
      <LeadershipSection />
      <TechEnjoySection />
      <CurrentFocusSection />
      <OutsideSection />
      <CTASection />
    </>
  );
}

import { createMetadata } from "@/config/metadata";
import { SITE_CONFIG } from "@/constants/site";
import { HeroSection } from "@/features/hero/HeroSection";
import { AchievementsSection } from "@/features/home/AchievementsSection";
import { CTASection } from "@/features/home/CTASection";
import { ExperienceSection } from "@/features/home/ExperienceSection";
import { FeaturedProjectsSection } from "@/features/home/FeaturedProjectsSection";
import { IntroSection } from "@/features/home/IntroSection";
import { LabPreviewSection } from "@/features/home/LabPreviewSection";
import { TechStackSection } from "@/features/home/TechStackSection";
import { WritingPreviewSection } from "@/features/home/WritingPreviewSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...createMetadata(),
  title: SITE_CONFIG.title,
};

export default function HomePage() {
  return (
    <>
      {/* Full-viewport hero with Three.js network scene */}
      <HeroSection />

      {/*
       * Homepage sections — all Server Components, rendered statically.
       * FadeInSection wrappers (client) add scroll-reveal animations.
       */}
      <IntroSection />
      <FeaturedProjectsSection />
      <LabPreviewSection />
      <ExperienceSection />
      <TechStackSection />
      <AchievementsSection />
      <WritingPreviewSection />
      <CTASection />
    </>
  );
}

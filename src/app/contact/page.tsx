import { AvailabilityCard } from "@/features/contact/AvailabilityCard";
import { ContactHero } from "@/features/contact/ContactHero";
import { ContactMethods } from "@/features/contact/ContactMethods";
import { CTASection } from "@/features/home/CTASection";
import { createPageMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
  "Contact — J Suhas",
  "Get in touch. Open to software engineering, AI, full-stack, developer relations, and startup opportunities.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <AvailabilityCard />
      <ContactMethods />
      <CTASection />
    </>
  );
}

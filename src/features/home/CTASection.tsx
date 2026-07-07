import { Container } from "@/components/shared/Container";
import type { LucideIcon } from "lucide-react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

interface ContactLink {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
  readonly download?: boolean | undefined;
  readonly variant: "primary" | "secondary";
}

const CONTACT_LINKS: readonly ContactLink[] = [
  {
    icon: Mail,
    label: "Send an email",
    href: "mailto:jsuhas@example.com",
    external: false,
    variant: "primary",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/jsuhas",
    external: true,
    variant: "secondary",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/jsuhas",
    external: true,
    variant: "secondary",
  },
  {
    icon: Download,
    label: "Download Resume",
    href: "/resume.pdf",
    external: false,
    download: true,
    variant: "secondary",
  },
];

/**
 * End-of-page call to action.
 * Centered layout, 4 contact buttons. No decorative backgrounds.
 */
export function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="border-border border-t py-20 md:py-28"
    >
      <Container>
        <FadeInSection className="mx-auto max-w-xl text-center">
          <p className="text-subtle font-mono text-xs tracking-[0.18em] uppercase">
            Get in touch
          </p>
          <h2
            id="cta-heading"
            className="text-foreground mt-3 text-2xl font-bold tracking-tight md:text-3xl"
          >
            Interested in building
            <br />
            something meaningful together?
          </h2>
          <p className="text-muted mt-4 text-base leading-7">
            I&apos;m open to interesting engineering challenges — whether that
            means joining a team, consulting on a system, or collaborating on
            something new.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              const sharedClass =
                "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
              const variantClass =
                link.variant === "primary"
                  ? "bg-foreground text-background hover:bg-foreground/85"
                  : "border border-border bg-surface-raised text-foreground hover:bg-surface-raised/70";

              const rel = link.external ? "noopener noreferrer" : undefined;
              const target = link.external ? "_blank" : undefined;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  rel={rel}
                  target={target}
                  download={link.download}
                  className={`${sharedClass} ${variantClass}`}
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {link.label}
                </a>
              );
            })}
          </div>
        </FadeInSection>
      </Container>
    </section>
  );
}

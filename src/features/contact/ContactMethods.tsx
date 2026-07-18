"use client";

import { Container } from "@/components/shared/Container";
import { FadeInSection } from "@/features/home/FadeInSection";
import { SectionHeader } from "@/features/home/SectionHeader";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";

interface ContactMethod {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly action: string;
  readonly href: string;
  readonly external?: boolean | undefined;
  readonly download?: boolean | undefined;
  readonly copyValue?: string | undefined;
}

const CONTACT_METHODS: readonly ContactMethod[] = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    description:
      "Best for project inquiries, collaboration, or anything detailed.",
    action: "suhasjanardhan10@gmail.com",
    href: "mailto:suhasjanardhan10@gmail.com",
    copyValue: "suhasjanardhan10@gmail.com",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect professionally. I respond to thoughtful DMs.",
    action: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/j-suhas-/",
    external: true,
  },
  {
    id: "github",
    icon: Github,
    title: "GitHub",
    description: "See my code, contributions, and open-source work.",
    action: "View GitHub",
    href: "https://github.com/jsuhas123",
    external: true,
  },
  {
    id: "medium",
    icon: NotebookPen,
    title: "Medium",
    description:
      "Engineering articles on distributed systems and system design.",
    action: "Read on Medium",
    href: "https://medium.com/@suhasjanardhan10",
    external: true,
  },
  {
    id: "portfolio",
    icon: FileText,
    title: "Portfolio",
    description:
      "This site — full project case studies and engineering documentation.",
    action: "You're already here",
    href: "/",
  },
  {
    id: "resume",
    icon: Download,
    title: "Resume",
    description: "Download my latest resume as a PDF.",
    action: "Download Resume",
    href: "/resume.pdf",
    download: true,
  },
];

function InlineCopyButton({ value }: { readonly value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy email address"}
      className="text-subtle hover:text-foreground focus-visible:ring-accent inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );
}

/**
 * Grid of contact method cards.
 * Email card gets a copy-to-clipboard button.
 */
export function ContactMethods() {
  return (
    <section
      aria-labelledby="contact-methods-heading"
      className="border-border border-t py-16 md:py-20"
    >
      <Container>
        <FadeInSection>
          <SectionHeader
            label="Ways to Reach Me"
            title="Get in Touch"
            id="contact-methods-heading"
          />
        </FadeInSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_METHODS.map((method, i) => {
            const Icon = method.icon;
            const rel = method.external ? "noopener noreferrer" : undefined;
            const target = method.external ? "_blank" : undefined;

            return (
              <FadeInSection key={method.id} delay={i * 0.05}>
                <div className="border-border bg-surface flex h-full flex-col rounded-xl border p-5">
                  {/* Icon */}
                  <div className="bg-surface-raised text-foreground mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>

                  {/* Text */}
                  <p className="text-foreground text-sm font-semibold">
                    {method.title}
                  </p>
                  <p className="text-muted mt-1 flex-1 text-xs leading-relaxed">
                    {method.description}
                  </p>

                  {/* Action */}
                  <div className="mt-4 flex items-center gap-2">
                    {method.id === "portfolio" ? (
                      <span className="text-subtle text-xs">
                        {method.action}
                      </span>
                    ) : (
                      <a
                        href={method.href}
                        rel={rel}
                        target={target}
                        download={method.download}
                        className={cn(
                          "text-accent flex-1 truncate text-xs font-medium",
                          "underline-offset-4 hover:underline",
                          "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
                        )}
                      >
                        {method.external && (
                          <ExternalLink
                            className="mr-1 inline h-3 w-3"
                            aria-hidden
                          />
                        )}
                        {method.action}
                      </a>
                    )}
                    {method.copyValue && (
                      <InlineCopyButton value={method.copyValue} />
                    )}
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

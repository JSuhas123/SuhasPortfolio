"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import {
  Download,
  ExternalLink,
  Folder,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Engineer",
  "System Design Enthusiast",
] as const;

/**
 * About page hero.
 * Role cycles every 2.5s with a smooth opacity fade.
 * Reduced motion: static role, no cycling.
 */
export function AboutHero() {
  const reduced = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setFading(false);
      }, 220);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const currentRole = ROLES[roleIdx] ?? ROLES[0];

  return (
    <section
      aria-label="Introduction"
      className="border-border bg-surface border-b py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="max-w-2xl">
          {/* Location */}
          <div className="text-subtle flex items-center gap-1.5 text-xs">
            <MapPin className="h-3 w-3" aria-hidden />
            Bengaluru, India
          </div>

          {/* Name */}
          <h1 className="text-foreground mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            J Suhas
          </h1>

          {/* Cycling role */}
          <p
            className={cn(
              "text-accent mt-2 font-mono text-base transition-opacity duration-200",
              fading && !reduced ? "opacity-0" : "opacity-100",
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {currentRole}
          </p>

          {/* Headline */}
          <p className="text-muted mt-5 text-base leading-8 md:text-lg">
            Building scalable software, intelligent systems and engineering
            experiences with a focus on performance, usability and thoughtful
            architecture.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Download className="h-4 w-4" aria-hidden />
              Resume
            </a>
            <a
              href="https://github.com/jsuhas"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
              <ExternalLink className="h-3 w-3 opacity-50" aria-hidden />
            </a>
            <a
              href="https://linkedin.com/in/jsuhas"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
              <ExternalLink className="h-3 w-3 opacity-50" aria-hidden />
            </a>
            <Link
              href={"/projects" as Route}
              className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Folder className="h-4 w-4" aria-hidden />
              Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

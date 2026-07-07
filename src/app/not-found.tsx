import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import type { Metadata, Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <PageWrapper>
      <Container className="flex flex-1 flex-col items-center justify-center py-32 text-center">
        {/* Code */}
        <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
          404
        </p>

        {/* Heading */}
        <h1 className="text-foreground mt-3 text-2xl font-bold tracking-tight md:text-3xl">
          Page not found
        </h1>
        <p className="text-muted mt-3 max-w-sm text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the URL, or use the links below.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            View projects
          </Link>
        </div>

        {/* Quick links */}
        <nav aria-label="Helpful links" className="mt-10">
          <p className="text-subtle mb-3 text-xs">You might be looking for</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { label: "About", href: "/about" },
              { label: "Experience", href: "/experience" },
              { label: "Engineering Lab", href: "/lab" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href as unknown as Route}
                className="text-accent focus-visible:ring-accent underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </PageWrapper>
  );
}

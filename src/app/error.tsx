"use client";

import { Container } from "@/components/shared/Container";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { useEffect } from "react";

interface ErrorPageProps {
  readonly error: Error & { readonly digest?: string | undefined };
  readonly reset: () => void;
}

/**
 * Global error boundary.
 * Must be a Client Component — Next.js requires it for error.tsx.
 * Logs the error server-side and exposes a "try again" reset action.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Replace with a real error-tracking service (Sentry, Datadog, etc.)
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <PageWrapper>
      <Container className="py-24">
        <p className="text-subtle font-mono text-xs">500</p>
        <h1 className="text-foreground mt-2 text-2xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-muted mt-2 text-sm">
          An unexpected error occurred. The team has been notified.
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-accent focus-visible:ring-accent mt-6 rounded-md text-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          Try again
        </button>
      </Container>
    </PageWrapper>
  );
}

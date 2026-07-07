"use client";

import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

/**
 * Root providers compositor.
 * Add new context providers here — order matters (outer renders first).
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

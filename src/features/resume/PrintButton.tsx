"use client";

import { Printer } from "lucide-react";

/** Client component — calls window.print() which is browser-only. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print resume"
      className="border-border bg-surface-raised text-foreground hover:bg-surface-raised/70 focus-visible:ring-accent inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <Printer className="h-3 w-3" aria-hidden />
      Print
    </button>
  );
}

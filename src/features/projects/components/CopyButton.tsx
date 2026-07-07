"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  readonly code: string;
  readonly className?: string | undefined;
}

/**
 * Client-side copy button for code blocks.
 * Shows a check mark for 2 seconds after copying.
 */
export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-secure context
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md",
        "text-[#8899aa] transition-colors hover:text-[#cdd9e5]",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );
}

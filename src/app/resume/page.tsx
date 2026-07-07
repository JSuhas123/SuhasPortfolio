import { Container } from "@/components/shared/Container";
import { PrintButton } from "@/features/resume/PrintButton";
import { ResumeContent } from "@/features/resume/ResumeContent";
import { createPageMetadata } from "@/utils/seo";
import { Download } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
  "Resume — J Suhas",
  "Online resume for J Suhas — Staff Frontend Engineer, Full Stack, AI, Distributed Systems.",
  "/resume",
);

export default function ResumePage() {
  return (
    <div>
      {/* Sticky action bar */}
      <div className="border-border bg-background/80 sticky top-14 z-[199] border-b backdrop-blur-sm">
        <Container>
          <div className="flex items-center justify-between py-2.5">
            <p className="text-muted text-xs">Resume — J Suhas</p>
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download
                className="bg-foreground text-background focus-visible:ring-accent inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:outline-none"
              >
                <Download className="h-3 w-3" aria-hidden />
                Download PDF
              </a>
              <PrintButton />
            </div>
          </div>
        </Container>
      </div>

      {/* Resume content */}
      <Container>
        <ResumeContent />
      </Container>
    </div>
  );
}

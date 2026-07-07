import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero CTA buttons.
 * "Explore Projects" links to the /projects route (typed).
 * "Download Resume" links to a static PDF — uses <a> to bypass typed routes.
 */
export function HeroCTA() {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Button asChild size="lg" variant="primary">
        <Link href="/projects">
          Explore Projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Button>

      <Button asChild size="lg" variant="outline">
        <a href="/resume.pdf" download aria-label="Download resume PDF">
          <Download className="h-4 w-4" aria-hidden />
          Download Resume
        </a>
      </Button>
    </div>
  );
}

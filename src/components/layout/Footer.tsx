import { Container } from "@/components/shared/Container";
import { FOOTER_NAV_ITEMS } from "@/config/navigation";
import { SITE_CONFIG } from "@/constants/site";
import Link from "next/link";

/**
 * Site footer.
 * Minimal, professional layout with copyright, navigation, and a build note.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          {/* Left — identity */}
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-sm font-medium">
              {SITE_CONFIG.author.name}
            </p>
            <p className="text-subtle text-xs">
              {SITE_CONFIG.description.split(",")[0]}
            </p>
          </div>

          {/* Right — nav + copyright */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-1"
            >
              {FOOTER_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-visible:ring-accent text-muted hover:text-foreground text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-subtle text-xs">
              © {year} {SITE_CONFIG.author.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

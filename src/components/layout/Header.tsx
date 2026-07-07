import { Nav } from "@/components/layout/Nav";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Sticky site header.
 * Server Component — client interactivity is delegated to Nav and ThemeToggle.
 */
export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-[200] border-b backdrop-blur-sm">
      <Container>
        <div className="relative flex h-14 items-center justify-between gap-4">
          <Logo />
          <Nav />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

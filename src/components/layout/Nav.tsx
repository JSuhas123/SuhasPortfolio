"use client";

import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Responsive navigation.
 * Desktop: inline links. Mobile: slide-in drawer triggered by a hamburger button.
 * Fully keyboard-navigable; active route is visually indicated.
 */
export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Desktop navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex md:items-center md:gap-6"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "focus-visible:ring-accent rounded-sm px-1 py-0.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive(item.href)
                ? "text-foreground font-medium"
                : "text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className="text-muted hover:bg-surface-raised hover:text-foreground focus-visible:ring-accent inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden"
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden />
        ) : (
          <Menu className="h-4 w-4" aria-hidden />
        )}
      </button>

      {/* Mobile navigation panel */}
      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-border bg-background absolute inset-x-0 top-full border-b"
        >
          <ul
            className="flex flex-col px-[var(--container-pad)] py-3"
            role="list"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "focus-visible:ring-accent block py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    isActive(item.href)
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

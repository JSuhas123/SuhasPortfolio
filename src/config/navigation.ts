import type { NavItem } from "@/types/navigation";
import type { Route } from "next";

export const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/projects" },
  // Lab route — cast resolves at next build when /lab is added to Route type
  { label: "Lab", href: "/lab" as unknown as Route },
  { label: "Book", href: "/writing" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Book", href: "/writing" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" as unknown as Route },
];

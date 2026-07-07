import type { Route } from "next";

export interface NavItem {
  readonly label: string;
  readonly href: Route;
  readonly external?: boolean;
}

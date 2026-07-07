/**
 * Accessibility: provides a keyboard-only shortcut to skip the header nav
 * and jump directly to the page's main content region.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="focus:bg-background focus:text-foreground focus:ring-accent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:outline-none"
    >
      Skip to content
    </a>
  );
}

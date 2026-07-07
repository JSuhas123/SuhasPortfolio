/**
 * Global loading state — shown by Next.js during route transitions.
 * Branded with a thin progress indicator matching the project design.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-32"
    >
      {/* Pulsing dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="bg-accent h-2 w-2 animate-pulse rounded-full"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <p className="text-subtle font-mono text-xs">Loading…</p>
      <span className="sr-only">Loading page content</span>
    </div>
  );
}

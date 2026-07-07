import { createHighlighter, type Highlighter } from "shiki";

let cached: Highlighter | null = null;

/**
 * Returns a singleton Shiki highlighter initialized with the languages
 * and theme used across project code snippets.
 * Initialized once per build / server instance; subsequent calls return
 * the cached instance with no async overhead.
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (cached) return cached;
  cached = await createHighlighter({
    themes: ["github-dark-dimmed"],
    langs: [
      "typescript",
      "tsx",
      "javascript",
      "python",
      "bash",
      "sql",
      "yaml",
      "json",
      "css",
    ],
  });
  return cached;
}

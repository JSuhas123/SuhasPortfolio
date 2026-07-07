const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(content: string): string {
  const minutes = getReadingTime(content);
  return `${minutes} min read`;
}

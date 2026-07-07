const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, { month: "short", year: "numeric" });
}

export function formatDateISO(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0] ?? d.toISOString();
}

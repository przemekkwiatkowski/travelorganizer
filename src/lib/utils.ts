export function formatTime(time: string): string {
  return time;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pl-PL", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pl-PL", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getTimezoneShift(
  homeTimezone: string,
  destinationTimezone: string
): string {
  const now = new Date();
  const homeOffset = getOffsetMinutes(now, homeTimezone);
  const destOffset = getOffsetMinutes(now, destinationTimezone);
  const diffHours = (destOffset - homeOffset) / 60;
  const sign = diffHours >= 0 ? "+" : "";
  return `${sign}${diffHours}h`;
}

function getOffsetMinutes(date: Date, timezone: string): number {
  const utcStr = date.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = date.toLocaleString("en-US", { timeZone: timezone });
  return (new Date(tzStr).getTime() - new Date(utcStr).getTime()) / 60000;
}

export function calculateDayCost(
  events: { cost?: { amount: number; currency: string } }[]
): { amount: number; currency: string } | null {
  const costs = events.filter((e) => e.cost);
  if (costs.length === 0) return null;
  const total = costs.reduce((sum, e) => sum + (e.cost?.amount ?? 0), 0);
  const currency = costs[0].cost!.currency;
  return { amount: total, currency };
}

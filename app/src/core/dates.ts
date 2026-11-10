/**
 * Calendar-date helpers for local dates written as YYYY-MM-DD.
 *
 * Dates are converted to a day index (days since 1970-01-01) using UTC arithmetic only,
 * so results never depend on the device time zone or daylight-saving changes.
 */

const MS_PER_DAY = 86_400_000;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses a YYYY-MM-DD date into a day index. Throws on malformed or impossible dates. */
export function parseDate(value: string): number {
  const match = DATE_PATTERN.exec(value);
  if (!match) throw new Error(`Invalid date (expected YYYY-MM-DD): ${JSON.stringify(value)}`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const ms = Date.UTC(year, month - 1, day);
  const check = new Date(ms);
  if (
    year < 1000 ||
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    throw new Error(`Invalid date: ${JSON.stringify(value)}`);
  }
  return Math.round(ms / MS_PER_DAY);
}

/** Formats a day index as YYYY-MM-DD. */
export function formatDate(dayIndex: number): string {
  const d = new Date(dayIndex * MS_PER_DAY);
  const yyyy = String(d.getUTCFullYear()).padStart(4, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** Returns the date `days` calendar days after `date` (negative goes back). */
export function addDays(date: string, days: number): string {
  return formatDate(parseDate(date) + days);
}

/** Calendar days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return parseDate(to) - parseDate(from);
}

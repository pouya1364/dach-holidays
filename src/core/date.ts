/**
 * Format a Date object as ISO date string (YYYY-MM-DD) in UTC.
 */
export function formatISODate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Parse an ISO date string (YYYY-MM-DD) into a UTC Date at noon.
 * Throws if the format is invalid.
 */
export function parseISODate(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) {
    throw new Error(`Invalid ISO date: "${iso}". Expected YYYY-MM-DD.`)
  }
  const [, y, m, d] = match
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), 12, 0, 0))
}

/**
 * Days between two dates (date2 - date1), rounded.
 */
export function daysBetween(date1: Date, date2: Date): number {
  const ms = date2.getTime() - date1.getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

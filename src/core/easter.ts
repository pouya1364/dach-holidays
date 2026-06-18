/**
 * Calculate Easter Sunday for a given year using the
 * Anonymous Gregorian algorithm (Meeus/Jones/Butcher).
 *
 * Returns a Date in UTC noon to avoid timezone edge cases.
 */
export function calculateEaster(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1

  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
}

/**
 * Calculate a date relative to Easter Sunday.
 * e.g. easterOffset(2026, -2) → Good Friday 2026
 */
export function easterOffset(year: number, offsetDays: number): Date {
  const easter = calculateEaster(year)
  const result = new Date(easter)
  result.setUTCDate(result.getUTCDate() + offsetDays)
  return result
}

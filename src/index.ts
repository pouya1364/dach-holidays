import { holidayAppliesTo, resolveHoliday } from './core/lookup'
import { daysBetween, formatISODate, parseISODate } from './core/date'
import { austriaHolidays } from './data/austria'
import { germanyHolidays } from './data/germany'
import { switzerlandHolidays } from './data/switzerland'
import type { Holiday, HolidayWithCountdown, Region } from './types'

export type { Holiday, HolidayWithCountdown, Region } from './types'

function getAllDefinitionsForRegion(region: Region) {
  const country = region.startsWith('DE') ? 'DE' : region.startsWith('AT') ? 'AT' : 'CH'
  if (country === 'DE') return germanyHolidays
  if (country === 'AT') return austriaHolidays
  return switzerlandHolidays
}

/**
 * Returns every holiday for the given year and region, sorted by date.
 * Includes all types ('public', 'regional', 'observance') — check `Holiday.type`
 * to keep only what you need (e.g. work-free 'public' days).
 */
export function getHolidays(year: number, region: Region): Holiday[] {
  const defs = getAllDefinitionsForRegion(region)
  return defs
    .map((def) => resolveHoliday(def, year))
    .filter((h) => holidayAppliesTo(h, region))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Whether the date is a work-free public holiday in the region. Only 'public'
 * holidays count; regional observances (e.g. Austrian Landespatrone) return
 * false. Use {@link getHoliday} for details of any type. Accepts an ISO date
 * string (YYYY-MM-DD) or a Date.
 */
export function isHoliday(date: string | Date, region: Region): boolean {
  return getHoliday(date, region)?.type === 'public'
}

/**
 * Returns the holiday on the given date, or null if there isn't one. Matches
 * any type; check `Holiday.type` to tell work-free days from observances.
 */
export function getHoliday(date: string | Date, region: Region): Holiday | null {
  const iso = typeof date === 'string' ? date : formatISODate(date)
  const parsed = parseISODate(iso)
  const year = parsed.getUTCFullYear()

  const holidays = getHolidays(year, region)
  return holidays.find((h) => h.date === iso) ?? null
}

/**
 * The next work-free public holiday on or after the reference date (defaults to
 * today), or null. Only 'public' holidays count. Looks into next year if none
 * remain in the current one.
 */
export function getNextHoliday(
  region: Region,
  from: string | Date = new Date(),
): HolidayWithCountdown | null {
  const fromDate = typeof from === 'string' ? parseISODate(from) : from
  const fromIso = formatISODate(fromDate)
  const year = fromDate.getUTCFullYear()

  // Try this year first, then next year
  for (const checkYear of [year, year + 1]) {
    const holidays = getHolidays(checkYear, region)
    const next = holidays.find((h) => h.date >= fromIso && h.type === 'public')
    if (next) {
      return {
        ...next,
        daysUntil: daysBetween(fromDate, parseISODate(next.date)),
      }
    }
  }

  return null
}

import type { Holiday, HolidayDefinition, Region } from '../types'
import { formatISODate } from './date'
import { easterOffset } from './easter'

/**
 * Resolve a HolidayDefinition to an actual Holiday on a given year.
 */
export function resolveHoliday(def: HolidayDefinition, year: number): Holiday {
  let date: Date

  if (def.date.type === 'fixed') {
    date = new Date(Date.UTC(year, def.date.month - 1, def.date.day, 12, 0, 0))
  } else if (def.date.type === 'easter') {
    date = easterOffset(year, def.date.offsetDays)
  } else {
    date = def.date.calculate(year)
  }

  return {
    date: formatISODate(date),
    name: def.name,
    type: def.type,
    regions: def.regions,
  }
}

/**
 * Check if a holiday definition applies to the given region.
 * A holiday applies if:
 *   - the region is explicitly listed, OR
 *   - the region's country is in the list (e.g. 'DE' covers all DE-* regions)
 */
export function holidayAppliesTo(holiday: Holiday, region: Region): boolean {
  // Direct match (covers sub-regions and bare country aliases like 'DE').
  if (holiday.regions.includes(region)) return true

  // If a sub-region is queried, also match its country-wide holidays.
  const country = region.split('-')[0] as Region
  return holiday.regions.includes(country)
}

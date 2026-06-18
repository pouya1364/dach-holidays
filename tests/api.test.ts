import { describe, expect, it } from 'vitest'
import { getHoliday, getHolidays, getNextHoliday, isHoliday } from '../src/index'

describe('public API', () => {
  describe('getHolidays', () => {
    it('DE: returns Bavaria 2026 holidays, sorted ascending', () => {
      const holidays = getHolidays(2026, 'DE-BY')
      expect(holidays.length).toBeGreaterThan(12)
      expect(holidays[0]?.date).toBe('2026-01-01')
      const dates = holidays.map((h) => h.date)
      expect(dates).toEqual([...dates].sort())
    })

    it('AT: country alias returns exactly the 13 nationwide holidays', () => {
      expect(getHolidays(2026, 'AT')).toHaveLength(13)
    })

    it('CH: Zürich 2026 has its expected cantonal set including Aug 1', () => {
      const holidays = getHolidays(2026, 'CH-ZH')
      expect(holidays).toHaveLength(10)
      expect(holidays.some((h) => h.date === '2026-08-01')).toBe(true)
    })
  })

  describe('isHoliday', () => {
    it('DE: Christmas Day is a holiday, an ordinary day is not', () => {
      expect(isHoliday('2026-12-25', 'DE-NW')).toBe(true)
      expect(isHoliday('2026-07-15', 'DE-NW')).toBe(false)
    })

    it('AT: National Day (Oct 26) is a holiday', () => {
      expect(isHoliday('2026-10-26', 'AT-9')).toBe(true)
    })

    it('CH: Swiss National Day (Aug 1) is a holiday in every canton', () => {
      expect(isHoliday('2026-08-01', 'CH-GE')).toBe(true)
    })

    it('accepts a Date object as well as an ISO string', () => {
      expect(isHoliday(new Date(Date.UTC(2026, 11, 25, 12, 0, 0)), 'DE-BY')).toBe(true)
    })
  })

  describe('getHoliday', () => {
    it('DE: returns full details for Christmas Day', () => {
      const holiday = getHoliday('2026-12-25', 'DE-BY')
      expect(holiday?.name.de).toBe('1. Weihnachtstag')
      expect(holiday?.type).toBe('public')
    })

    it('AT: returns the National Day details', () => {
      expect(getHoliday('2026-10-26', 'AT-9')?.name.de).toBe('Nationalfeiertag')
    })

    it('CH: returns Italian translation for Ticino', () => {
      expect(getHoliday('2026-08-01', 'CH-TI')?.name.it).toBe('Festa nazionale svizzera')
    })

    it('returns null for a non-holiday date', () => {
      expect(getHoliday('2026-07-15', 'DE-NW')).toBeNull()
    })
  })

  describe('type semantics (public vs regional)', () => {
    // Rupertitag (Salzburg, Sep 24) is a Landespatron: type 'regional', not
    // legally work-free. isHoliday excludes it; getHoliday still surfaces it.
    it('isHoliday is false for a regional day, getHoliday returns it as regional', () => {
      expect(isHoliday('2026-09-24', 'AT-5')).toBe(false)
      const holiday = getHoliday('2026-09-24', 'AT-5')
      expect(holiday?.type).toBe('regional')
      expect(holiday?.name.de).toBe('Rupertitag')
    })
  })

  describe('getNextHoliday', () => {
    it('DE: finds an upcoming holiday in the same year', () => {
      const next = getNextHoliday('DE-BY', '2026-12-01')
      expect(next?.date).toBe('2026-12-25')
      expect(next?.daysUntil).toBe(24)
    })

    it('AT: returns daysUntil 0 when the reference date is itself a holiday', () => {
      const next = getNextHoliday('AT-9', '2026-01-01')
      expect(next?.date).toBe('2026-01-01')
      expect(next?.daysUntil).toBe(0)
    })

    it('CH: skips non-public days and finds the next public holiday', () => {
      const next = getNextHoliday('CH-ZH', '2026-07-01')
      expect(next?.date).toBe('2026-08-01')
      expect(next?.daysUntil).toBe(31)
    })

    it('rolls over into the following year when none remain', () => {
      // After Dec 28 the last DE holiday (Dec 26) has passed, so the next one
      // is New Year's Day of the following year.
      const next = getNextHoliday('DE-BY', '2026-12-28')
      expect(next?.date).toBe('2027-01-01')
      expect(next?.daysUntil).toBe(4)
    })

    it('only counts public holidays, never regional ones', () => {
      // Querying Salzburg just before Rupertitag (Sep 24, regional) must skip it
      // and land on the next public holiday instead.
      const next = getNextHoliday('AT-5', '2026-09-23')
      expect(next?.date).not.toBe('2026-09-24')
      expect(next?.type).toBe('public')
    })
  })
})

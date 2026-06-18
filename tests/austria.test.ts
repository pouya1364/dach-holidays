import { describe, expect, it } from 'vitest'
import { getHoliday, getHolidays, isHoliday } from '../src/index'

describe('Austria holidays', () => {
  describe('nationwide', () => {
    it('New Year is always a holiday', () => {
      expect(isHoliday('2026-01-01', 'AT-9')).toBe(true)
      expect(isHoliday('2026-01-01', 'AT-7')).toBe(true)
    })

    it('National Day (Oct 26) is always a holiday', () => {
      expect(isHoliday('2026-10-26', 'AT-9')).toBe(true)
      expect(isHoliday('2026-10-26', 'AT-1')).toBe(true)
    })

    it('Immaculate Conception (Dec 8) is always a holiday', () => {
      expect(isHoliday('2026-12-08', 'AT-3')).toBe(true)
    })

    it('Good Friday is NOT a public holiday (abolished as a general holiday)', () => {
      // Easter 2026 = 2026-04-05, so Good Friday = 2026-04-03
      expect(isHoliday('2026-04-03', 'AT-9')).toBe(false)
    })
  })

  describe('regional variations', () => {
    // Landespatrone are 'regional', so check region membership with getHoliday
    // rather than isHoliday (which only reports work-free 'public' days).
    it("St. Rupert's Day (Sep 24) is listed for Salzburg but not Vienna", () => {
      expect(getHoliday('2026-09-24', 'AT-5')).not.toBeNull()
      expect(getHoliday('2026-09-24', 'AT-9')).toBeNull()
    })

    it("St. Leopold's Day (Nov 15) is listed for Vienna but not Salzburg", () => {
      expect(getHoliday('2026-11-15', 'AT-9')).not.toBeNull()
      expect(getHoliday('2026-11-15', 'AT-5')).toBeNull()
    })
  })

  describe('public vs regional type semantics', () => {
    // Rupertitag is a Landespatron (type 'regional'), not a legally work-free day.
    it('isHoliday returns false for a regional Landespatron day', () => {
      expect(isHoliday('2026-09-24', 'AT-5')).toBe(false)
    })

    it('getHoliday still returns the regional holiday object for that date', () => {
      const holiday = getHoliday('2026-09-24', 'AT-5')
      expect(holiday).not.toBeNull()
      expect(holiday?.type).toBe('regional')
      expect(holiday?.name.de).toBe('Rupertitag')
    })

    it('isHoliday still returns true for a nationwide public holiday', () => {
      expect(isHoliday('2026-10-26', 'AT-5')).toBe(true)
      expect(getHoliday('2026-10-26', 'AT-5')?.type).toBe('public')
    })
  })

  describe('getHolidays', () => {
    it('returns the 13 nationwide holidays for the country alias AT', () => {
      const holidays = getHolidays(2026, 'AT')
      expect(holidays.length).toBe(13)
      expect(holidays[0]?.date).toBe('2026-01-01')
    })

    it('Vienna (AT-9) adds Leopolditag on top of the nationwide set', () => {
      const holidays = getHolidays(2026, 'AT-9')
      expect(holidays.length).toBe(14)
      expect(holidays.some((h) => h.date === '2026-11-15')).toBe(true)
    })
  })
})

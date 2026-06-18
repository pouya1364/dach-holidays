import { describe, expect, it } from 'vitest'
import { getHolidays, isHoliday } from '../src/index'

describe('Germany holidays', () => {
  describe('nationwide', () => {
    it('New Year is always a holiday', () => {
      expect(isHoliday('2026-01-01', 'DE-BE')).toBe(true)
      expect(isHoliday('2026-01-01', 'DE-BY')).toBe(true)
    })

    it('Christmas Day is always a holiday', () => {
      expect(isHoliday('2026-12-25', 'DE-NW')).toBe(true)
    })

    it('German Unity Day is always a holiday', () => {
      expect(isHoliday('2026-10-03', 'DE-HH')).toBe(true)
    })
  })

  describe('regional variations', () => {
    it('Corpus Christi is a holiday in Bavaria but not Berlin', () => {
      const corpusChristi2026 = '2026-06-04' // Easter + 60 in 2026
      expect(isHoliday(corpusChristi2026, 'DE-BY')).toBe(true)
      expect(isHoliday(corpusChristi2026, 'DE-BE')).toBe(false)
    })

    it('Reformation Day is a holiday in Saxony but not Bavaria', () => {
      expect(isHoliday('2026-10-31', 'DE-SN')).toBe(true)
      expect(isHoliday('2026-10-31', 'DE-BY')).toBe(false)
    })

    it("International Women's Day is a holiday in Berlin but not Bavaria", () => {
      expect(isHoliday('2026-03-08', 'DE-BE')).toBe(true)
      expect(isHoliday('2026-03-08', 'DE-BY')).toBe(false)
    })

    it('World Children’s Day is a holiday in Thuringia but not Saxony', () => {
      expect(isHoliday('2026-09-20', 'DE-TH')).toBe(true)
      expect(isHoliday('2026-09-20', 'DE-SN')).toBe(false)
    })
  })

  describe('getHolidays', () => {
    it('returns all Bavaria holidays for 2026', () => {
      const holidays = getHolidays(2026, 'DE-BY')
      expect(holidays.length).toBeGreaterThan(12)
      expect(holidays[0]?.date).toBe('2026-01-01')
    })

    it('returns holidays sorted by date ascending', () => {
      const holidays = getHolidays(2026, 'DE-BY')
      const dates = holidays.map((h) => h.date)
      expect(dates).toEqual([...dates].sort())
    })
  })
})

import { describe, expect, it } from 'vitest'
import { formatISODate } from '../src/core/date'
import { calculateEaster } from '../src/core/easter'

describe('calculateEaster', () => {
  // Known Easter dates — verify against a calendar
  const knownEasters: Record<number, string> = {
    2024: '2024-03-31',
    2025: '2025-04-20',
    2026: '2026-04-05',
    2027: '2027-03-28',
    2028: '2028-04-16',
    2029: '2029-04-01',
    2030: '2030-04-21',
  }

  for (const [yearStr, expected] of Object.entries(knownEasters)) {
    const year = Number(yearStr)
    it(`returns ${expected} for ${year}`, () => {
      expect(formatISODate(calculateEaster(year))).toBe(expected)
    })
  }
})

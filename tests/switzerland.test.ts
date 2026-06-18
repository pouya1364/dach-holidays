import { describe, expect, it } from 'vitest'
import { getHoliday, getHolidays, isHoliday } from '../src/index'

describe('Switzerland holidays', () => {
  describe('federal holiday', () => {
    it('Swiss National Day (Aug 1) is a holiday in every canton', () => {
      expect(isHoliday('2026-08-01', 'CH-ZH')).toBe(true)
      expect(isHoliday('2026-08-01', 'CH-TI')).toBe(true)
      expect(isHoliday('2026-08-01', 'CH-GE')).toBe(true)
      expect(isHoliday('2026-08-01', 'CH-VS')).toBe(true)
    })

    it("is the ONLY holiday returned for the bare 'CH' country alias", () => {
      const federal = getHolidays(2026, 'CH')
      expect(federal).toHaveLength(1)
      expect(federal[0]?.date).toBe('2026-08-01')
      expect(federal[0]?.name.de).toBe('Bundesfeier')
    })

    it('carries fr and it translations', () => {
      expect(getHoliday('2026-08-01', 'CH-GE')?.name.fr).toBe('Fête nationale suisse')
      expect(getHoliday('2026-08-01', 'CH-TI')?.name.it).toBe('Festa nazionale svizzera')
    })
  })

  describe('federal alias vs cantonal observance', () => {
    // Only August 1 is federal. New Year's is observed in every canton but is
    // legally cantonal, so it's listed against the 26 canton codes, not 'CH'.
    // The bare 'CH' alias therefore only matches federal holidays.
    it("New Year's is cantonal, not federal: false for 'CH' but true for 'CH-ZH'", () => {
      expect(isHoliday('2026-01-01', 'CH')).toBe(false)
      expect(isHoliday('2026-01-01', 'CH-ZH')).toBe(true)
    })
  })

  describe('cantonal variations', () => {
    it('Corpus Christi (Easter+60) is a holiday in Catholic VS but not Protestant ZH', () => {
      const corpusChristi2026 = '2026-06-04'
      expect(isHoliday(corpusChristi2026, 'CH-VS')).toBe(true)
      expect(isHoliday(corpusChristi2026, 'CH-ZH')).toBe(false)
    })

    it('Good Friday (Easter-2) is a holiday in ZH but not in VS or TI', () => {
      const goodFriday2026 = '2026-04-03'
      expect(isHoliday(goodFriday2026, 'CH-ZH')).toBe(true)
      expect(isHoliday(goodFriday2026, 'CH-VS')).toBe(false)
      expect(isHoliday(goodFriday2026, 'CH-TI')).toBe(false)
    })

    it('Berchtoldstag (Jan 2) is a holiday in ZH but not Geneva', () => {
      expect(isHoliday('2026-01-02', 'CH-ZH')).toBe(true)
      expect(isHoliday('2026-01-02', 'CH-GE')).toBe(false)
    })
  })

  describe('canton-specific custom dates', () => {
    it('Jeûne genevois falls on the Thursday after the first Sunday of September', () => {
      // 2026: first Sunday of Sep is the 6th → following Thursday is the 10th.
      const jeune = getHoliday('2026-09-10', 'CH-GE')
      expect(jeune).not.toBeNull()
      expect(jeune?.type).toBe('public')
      expect(jeune?.name.fr).toBe('Jeûne genevois')
    })

    it('Jeûne genevois does not apply outside Geneva', () => {
      expect(getHoliday('2026-09-10', 'CH-ZH')).toBeNull()
    })

    it("Näfelser Fahrt is the first Thursday of April in Glarus only", () => {
      // 2026: first Thursday of April is the 2nd.
      expect(isHoliday('2026-04-02', 'CH-GL')).toBe(true)
      expect(getHoliday('2026-04-02', 'CH-ZH')).toBeNull()
    })
  })
})

import type { HolidayDefinition } from '../types'

const ALL_DE = ['DE'] as const

export const germanyHolidays: HolidayDefinition[] = [
  {
    name: { de: 'Neujahrstag', en: "New Year's Day" },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 1 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Heilige Drei Könige', en: 'Epiphany' },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 6 },
    regions: ['DE-BW', 'DE-BY', 'DE-ST'],
  },
  {
    name: { de: 'Internationaler Frauentag', en: "International Women's Day" },
    type: 'public',
    date: { type: 'fixed', month: 3, day: 8 },
    regions: ['DE-BE', 'DE-MV'],
  },
  {
    name: { de: 'Karfreitag', en: 'Good Friday' },
    type: 'public',
    date: { type: 'easter', offsetDays: -2 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Ostermontag', en: 'Easter Monday' },
    type: 'public',
    date: { type: 'easter', offsetDays: 1 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Tag der Arbeit', en: 'Labour Day' },
    type: 'public',
    date: { type: 'fixed', month: 5, day: 1 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Christi Himmelfahrt', en: 'Ascension Day' },
    type: 'public',
    date: { type: 'easter', offsetDays: 39 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Pfingstmontag', en: 'Whit Monday' },
    type: 'public',
    date: { type: 'easter', offsetDays: 50 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Fronleichnam', en: 'Corpus Christi' },
    type: 'public',
    date: { type: 'easter', offsetDays: 60 },
    regions: ['DE-BW', 'DE-BY', 'DE-HE', 'DE-NW', 'DE-RP', 'DE-SL'],
  },
  {
    // BY: simplified to apply state-wide; in reality only observed in
    // municipalities with majority Catholic population.
    name: { de: 'Mariä Himmelfahrt', en: 'Assumption Day' },
    type: 'public',
    date: { type: 'fixed', month: 8, day: 15 },
    regions: ['DE-SL', 'DE-BY'],
  },
  {
    name: { de: 'Weltkindertag', en: "World Children's Day" },
    type: 'public',
    date: { type: 'fixed', month: 9, day: 20 },
    regions: ['DE-TH'],
  },
  {
    name: { de: 'Tag der Deutschen Einheit', en: 'German Unity Day' },
    type: 'public',
    date: { type: 'fixed', month: 10, day: 3 },
    regions: [...ALL_DE],
  },
  {
    name: { de: 'Reformationstag', en: 'Reformation Day' },
    type: 'public',
    date: { type: 'fixed', month: 10, day: 31 },
    regions: ['DE-BB', 'DE-HB', 'DE-HH', 'DE-MV', 'DE-NI', 'DE-SN', 'DE-ST', 'DE-SH', 'DE-TH'],
  },
  {
    name: { de: 'Allerheiligen', en: "All Saints' Day" },
    type: 'public',
    date: { type: 'fixed', month: 11, day: 1 },
    regions: ['DE-BW', 'DE-BY', 'DE-NW', 'DE-RP', 'DE-SL'],
  },
  {
    name: { de: 'Buß- und Bettag', en: 'Day of Repentance and Prayer' },
    type: 'public',
    date: {
      type: 'custom',
      // Wednesday before November 23
      calculate: (year) => {
        const nov23 = new Date(Date.UTC(year, 10, 23, 12, 0, 0))
        const dayOfWeek = nov23.getUTCDay() // 0=Sun, 3=Wed
        const daysBack = dayOfWeek === 3 ? 7 : (dayOfWeek + 4) % 7
        nov23.setUTCDate(nov23.getUTCDate() - daysBack)
        return nov23
      },
    },
    regions: ['DE-SN'],
  },
  {
    name: { de: '1. Weihnachtstag', en: 'Christmas Day' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 25 },
    regions: [...ALL_DE],
  },
  {
    name: { de: '2. Weihnachtstag', en: "Boxing Day / St. Stephen's Day" },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 26 },
    regions: [...ALL_DE],
  },
]

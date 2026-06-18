import type { HolidayDefinition } from '../types'

const ALL_AT = ['AT'] as const

// Bundesländer codes (ISO 3166-2:AT):
//   AT-1 Burgenland · AT-2 Kärnten · AT-3 Niederösterreich · AT-4 Oberösterreich
//   AT-5 Salzburg · AT-6 Steiermark · AT-7 Tirol · AT-8 Vorarlberg · AT-9 Wien
//
// Karfreitag is not in this list: since the 2019 reform it's a "persönlicher
// Feiertag" rather than a general work-free day.
export const austriaHolidays: HolidayDefinition[] = [
  {
    name: { de: 'Neujahr', en: "New Year's Day" },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 1 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Heilige Drei Könige', en: 'Epiphany' },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 6 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Ostermontag', en: 'Easter Monday' },
    type: 'public',
    date: { type: 'easter', offsetDays: 1 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Staatsfeiertag', en: 'National Holiday (Labour Day)' },
    type: 'public',
    date: { type: 'fixed', month: 5, day: 1 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Christi Himmelfahrt', en: 'Ascension Day' },
    type: 'public',
    date: { type: 'easter', offsetDays: 39 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Pfingstmontag', en: 'Whit Monday' },
    type: 'public',
    date: { type: 'easter', offsetDays: 50 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Fronleichnam', en: 'Corpus Christi' },
    type: 'public',
    date: { type: 'easter', offsetDays: 60 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Mariä Himmelfahrt', en: 'Assumption Day' },
    type: 'public',
    date: { type: 'fixed', month: 8, day: 15 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Nationalfeiertag', en: 'National Day' },
    type: 'public',
    date: { type: 'fixed', month: 10, day: 26 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Allerheiligen', en: "All Saints' Day" },
    type: 'public',
    date: { type: 'fixed', month: 11, day: 1 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Mariä Empfängnis', en: 'Immaculate Conception' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 8 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Christtag', en: 'Christmas Day' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 25 },
    regions: [...ALL_AT],
  },
  {
    name: { de: 'Stefanitag', en: "St. Stephen's Day" },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 26 },
    regions: [...ALL_AT],
  },

  // Landespatrone (patron-saint days). Not work-free under the Arbeitsruhegesetz
  // — they're regional school/office observances, so they're typed 'regional'.
  {
    name: { de: 'Hl. Josef', en: "St. Joseph's Day" },
    type: 'regional',
    date: { type: 'fixed', month: 3, day: 19 },
    regions: ['AT-2', 'AT-6', 'AT-7', 'AT-8'],
  },
  {
    name: { de: 'Hl. Florian', en: "St. Florian's Day" },
    type: 'regional',
    date: { type: 'fixed', month: 5, day: 4 },
    regions: ['AT-4'],
  },
  {
    name: { de: 'Rupertitag', en: "St. Rupert's Day" },
    type: 'regional',
    date: { type: 'fixed', month: 9, day: 24 },
    regions: ['AT-5'],
  },
  {
    name: { de: 'Tag der Volksabstimmung', en: 'Plebiscite Day' },
    type: 'regional',
    date: { type: 'fixed', month: 10, day: 10 },
    regions: ['AT-2'],
  },
  {
    name: { de: 'Martinstag', en: "St. Martin's Day" },
    type: 'regional',
    date: { type: 'fixed', month: 11, day: 11 },
    regions: ['AT-1'],
  },
  {
    name: { de: 'Leopolditag', en: "St. Leopold's Day" },
    type: 'regional',
    date: { type: 'fixed', month: 11, day: 15 },
    regions: ['AT-3', 'AT-9'],
  },
]

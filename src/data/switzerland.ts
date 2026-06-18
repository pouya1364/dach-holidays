import type { HolidayDefinition } from '../types'

// August 1 (Bundesfeier) is the only holiday that's nationwide by federal law,
// so it's tagged with the 'CH' alias. Everything else is cantonal and listed
// against the cantons that observe it — including the days that happen to be
// observed everywhere.
//
// Holidays observed only in parts of a canton (AG, GR, FR, SO) are kept at
// canton granularity. French/Italian names are filled in for the Romandie and
// Ticino.
const ALL_CANTONS = [
  'CH-AG',
  'CH-AI',
  'CH-AR',
  'CH-BE',
  'CH-BL',
  'CH-BS',
  'CH-FR',
  'CH-GE',
  'CH-GL',
  'CH-GR',
  'CH-JU',
  'CH-LU',
  'CH-NE',
  'CH-NW',
  'CH-OW',
  'CH-SG',
  'CH-SH',
  'CH-SO',
  'CH-SZ',
  'CH-TG',
  'CH-TI',
  'CH-UR',
  'CH-VD',
  'CH-VS',
  'CH-ZG',
  'CH-ZH',
] as const

// Catholic cantons that observe Corpus Christi / Assumption / Immaculate Conception.
const CATHOLIC = ['CH-LU', 'CH-UR', 'CH-SZ', 'CH-OW', 'CH-NW', 'CH-ZG', 'CH-FR', 'CH-SO', 'CH-AI', 'CH-TI', 'CH-VS', 'CH-JU'] as const

export const switzerlandHolidays: HolidayDefinition[] = [
  {
    name: { de: 'Neujahr', en: "New Year's Day", fr: 'Nouvel An', it: 'Capodanno' },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 1 },
    regions: [...ALL_CANTONS],
  },
  {
    name: { de: 'Berchtoldstag', en: "St. Berchtold's Day", fr: 'Saint-Berchtold' },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 2 },
    regions: ['CH-ZH', 'CH-BE', 'CH-LU', 'CH-OW', 'CH-GL', 'CH-ZG', 'CH-FR', 'CH-SO', 'CH-SH', 'CH-TG', 'CH-AG', 'CH-VD', 'CH-NE', 'CH-JU'],
  },
  {
    name: { de: 'Heilige Drei Könige', en: 'Epiphany', fr: 'Épiphanie', it: 'Epifania' },
    type: 'public',
    date: { type: 'fixed', month: 1, day: 6 },
    regions: ['CH-UR', 'CH-SZ', 'CH-TI'],
  },
  {
    name: { de: 'Josefstag', en: "St. Joseph's Day", fr: 'Saint-Joseph', it: 'San Giuseppe' },
    type: 'public',
    date: { type: 'fixed', month: 3, day: 19 },
    regions: ['CH-UR', 'CH-SZ', 'CH-NW', 'CH-TI', 'CH-VS'],
  },
  {
    name: { de: 'Karfreitag', en: 'Good Friday', fr: 'Vendredi saint' },
    type: 'public',
    date: { type: 'easter', offsetDays: -2 },
    // All cantons except the Catholic TI and VS.
    regions: ALL_CANTONS.filter((c) => c !== 'CH-TI' && c !== 'CH-VS'),
  },
  {
    name: { de: 'Ostermontag', en: 'Easter Monday', fr: 'Lundi de Pâques', it: 'Lunedì di Pasqua' },
    type: 'public',
    date: { type: 'easter', offsetDays: 1 },
    regions: [...ALL_CANTONS],
  },
  {
    name: { de: 'Näfelser Fahrt', en: 'Battle of Näfels commemoration' },
    type: 'public',
    // First Thursday in April — Glarus only.
    date: {
      type: 'custom',
      calculate: (year) => {
        const d = new Date(Date.UTC(year, 3, 1, 12, 0, 0))
        const offsetToThursday = (4 - d.getUTCDay() + 7) % 7
        d.setUTCDate(1 + offsetToThursday)
        return d
      },
    },
    regions: ['CH-GL'],
  },
  {
    name: { de: 'Tag der Arbeit', en: 'Labour Day', fr: 'Fête du Travail', it: 'Festa dei lavoratori' },
    type: 'public',
    date: { type: 'fixed', month: 5, day: 1 },
    regions: ['CH-ZH', 'CH-BS', 'CH-BL', 'CH-SH', 'CH-SO', 'CH-AG', 'CH-TG', 'CH-TI', 'CH-NE', 'CH-JU'],
  },
  {
    name: { de: 'Auffahrt', en: 'Ascension Day', fr: 'Ascension', it: 'Ascensione' },
    type: 'public',
    date: { type: 'easter', offsetDays: 39 },
    regions: [...ALL_CANTONS],
  },
  {
    name: { de: 'Pfingstmontag', en: 'Whit Monday', fr: 'Lundi de Pentecôte', it: 'Lunedì di Pentecoste' },
    type: 'public',
    date: { type: 'easter', offsetDays: 50 },
    regions: [...ALL_CANTONS],
  },
  {
    name: { de: 'Fronleichnam', en: 'Corpus Christi', fr: 'Fête-Dieu', it: 'Corpus Domini' },
    type: 'public',
    date: { type: 'easter', offsetDays: 60 },
    regions: [...CATHOLIC],
  },
  {
    name: { de: 'Bundesfeier', en: 'Swiss National Day', fr: 'Fête nationale suisse', it: 'Festa nazionale svizzera' },
    type: 'public',
    // The only federal (nationwide) holiday.
    date: { type: 'fixed', month: 8, day: 1 },
    regions: ['CH'],
  },
  {
    name: { de: 'Mariä Himmelfahrt', en: 'Assumption Day', fr: 'Assomption', it: 'Assunzione' },
    type: 'public',
    date: { type: 'fixed', month: 8, day: 15 },
    regions: [...CATHOLIC],
  },
  {
    name: { de: 'Genfer Bettag', en: 'Geneva Fast', fr: 'Jeûne genevois' },
    type: 'public',
    // Thursday following the first Sunday of September — Geneva only.
    date: {
      type: 'custom',
      calculate: (year) => {
        const d = new Date(Date.UTC(year, 8, 1, 12, 0, 0))
        const offsetToSunday = (7 - d.getUTCDay()) % 7
        d.setUTCDate(1 + offsetToSunday + 4)
        return d
      },
    },
    regions: ['CH-GE'],
  },
  {
    name: { de: 'Eidgenössischer Bettag (Montag)', en: 'Federal Fast Monday', fr: 'Lundi du Jeûne fédéral' },
    type: 'public',
    // Monday after the third Sunday of September — Vaud.
    date: {
      type: 'custom',
      calculate: (year) => {
        const d = new Date(Date.UTC(year, 8, 1, 12, 0, 0))
        const offsetToSunday = (7 - d.getUTCDay()) % 7
        d.setUTCDate(1 + offsetToSunday + 14 + 1)
        return d
      },
    },
    regions: ['CH-VD'],
  },
  {
    name: { de: 'Allerheiligen', en: "All Saints' Day", fr: 'Toussaint', it: 'Ognissanti' },
    type: 'public',
    date: { type: 'fixed', month: 11, day: 1 },
    regions: ['CH-LU', 'CH-UR', 'CH-SZ', 'CH-OW', 'CH-NW', 'CH-GL', 'CH-ZG', 'CH-FR', 'CH-SO', 'CH-AI', 'CH-SG', 'CH-TI', 'CH-VS', 'CH-JU'],
  },
  {
    name: { de: 'Mariä Empfängnis', en: 'Immaculate Conception', fr: 'Immaculée Conception', it: 'Immacolata Concezione' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 8 },
    regions: ['CH-LU', 'CH-UR', 'CH-SZ', 'CH-OW', 'CH-NW', 'CH-ZG', 'CH-FR', 'CH-AI', 'CH-TI', 'CH-VS'],
  },
  {
    name: { de: 'Weihnachten', en: 'Christmas Day', fr: 'Noël', it: 'Natale' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 25 },
    regions: [...ALL_CANTONS],
  },
  {
    name: { de: 'Stephanstag', en: "St. Stephen's Day", fr: 'Saint-Étienne', it: 'Santo Stefano' },
    type: 'public',
    date: { type: 'fixed', month: 12, day: 26 },
    regions: ['CH-ZH', 'CH-BE', 'CH-LU', 'CH-UR', 'CH-SZ', 'CH-OW', 'CH-NW', 'CH-GL', 'CH-ZG', 'CH-SO', 'CH-BS', 'CH-BL', 'CH-SH', 'CH-AR', 'CH-AI', 'CH-SG', 'CH-GR', 'CH-AG', 'CH-TG', 'CH-TI'],
  },
  {
    name: { de: 'Restauration der Republik', en: 'Restoration of the Republic', fr: 'Restauration de la République' },
    type: 'public',
    // Geneva only.
    date: { type: 'fixed', month: 12, day: 31 },
    regions: ['CH-GE'],
  },
]

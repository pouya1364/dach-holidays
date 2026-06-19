# dach-holidays

[![npm version](https://img.shields.io/npm/v/dach-holidays.svg)](https://www.npmjs.com/package/dach-holidays)
[![bundle size](https://img.shields.io/bundlephobia/minzip/dach-holidays)](https://bundlephobia.com/package/dach-holidays)
[![license](https://img.shields.io/npm/l/dach-holidays.svg)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/dach-holidays.svg)](https://www.npmjs.com/package/dach-holidays)

Public holidays for Germany, Austria, and Switzerland — every state, Bundesland, and canton, fully typed.

## Why this?

The DACH region is a patchwork: Germany's 16 states, Austria's 9 Bundesländer, and Switzerland's 26 cantons each observe a different set of holidays. `dach-holidays` models those regional differences correctly, computes movable feasts (Easter and everything derived from it) without a date library, and ships zero runtime dependencies with first-class TypeScript types. It distinguishes legally work-free holidays from regional observances, and includes German, English, French, and Italian names where they apply.

## Installation

```bash
npm install dach-holidays
```

Ships both ESM and CommonJS builds with bundled type declarations. Node 18+.

## Quick start

```typescript
import { isHoliday, getHolidays, getHoliday, getNextHoliday } from 'dach-holidays'

// Is this date a work-free public holiday in the region?
isHoliday('2026-12-25', 'DE-BY') // true  — Christmas in Bavaria
isHoliday('2026-11-01', 'DE-BE') // false — All Saints' is not observed in Berlin
isHoliday('2026-08-01', 'CH-ZH') // true  — Swiss National Day

// Every holiday for a year and region
getHolidays(2026, 'DE-BY')
// → [{ date: '2026-01-01', name: { de: 'Neujahrstag', en: "New Year's Day" }, type: 'public', regions: ['DE'] }, ...]

// Details for a single date, or null
getHoliday('2026-10-26', 'AT-9')
// → { date: '2026-10-26', name: { de: 'Nationalfeiertag', en: 'National Day' }, type: 'public', regions: ['AT'] }

// The next public holiday from a reference date (defaults to today)
getNextHoliday('DE-BE', '2026-12-28')
// → { date: '2027-01-01', name: { ... }, type: 'public', regions: ['DE'], daysUntil: 4 }
```

## API

### `getHolidays(year, region): Holiday[]`

All holidays for the given year and region, sorted by date ascending. Includes every type (`public`, `regional`, `observance`) — read `Holiday.type` to filter.

```typescript
getHolidays(2026, 'CH-GE') // all holidays observed in Geneva
```

### `isHoliday(date, region): boolean`

Whether the date is a work-free **public** holiday in the region. Regional observances (e.g. Austrian Landespatrone) return `false`. Accepts an ISO date string (`YYYY-MM-DD`) or a `Date`.

```typescript
isHoliday('2026-06-04', 'DE-BY') // true  — Corpus Christi
isHoliday('2026-06-04', 'DE-BE') // false
```

### `getHoliday(date, region): Holiday | null`

The holiday on the given date, or `null`. Matches any type, so this surfaces regional observances that `isHoliday` excludes — check `Holiday.type` to tell them apart.

```typescript
getHoliday('2026-09-24', 'AT-5') // → { ..., name: { de: 'Rupertitag', ... }, type: 'regional' }
isHoliday('2026-09-24', 'AT-5')  // false (not work-free)
```

### `getNextHoliday(region, from?): HolidayWithCountdown | null`

The next work-free public holiday on or after `from` (defaults to today), with a `daysUntil` countdown. Rolls into the following year if none remain in the current one.

```typescript
getNextHoliday('CH-ZH') // → { date: '...', ..., daysUntil: 12 }
```

### Types

```typescript
type HolidayType = 'public' | 'regional' | 'observance'

interface HolidayName {
  de: string
  en: string
  fr?: string // French-speaking regions (Romandie)
  it?: string // Ticino
}

interface Holiday {
  date: string // ISO date, e.g. '2026-12-25'
  name: HolidayName
  type: HolidayType
  regions: Region[]
}

interface HolidayWithCountdown extends Holiday {
  daysUntil: number // 0 = the reference date itself
}
```

## Regions

Regions use ISO 3166-2 style codes. Pass a bare country code (`DE`, `AT`, `CH`) to get only the nationwide holidays for that country.

### Germany (`DE`)

| Code | State | Code | State |
|---|---|---|---|
| `DE-BW` | Baden-Württemberg | `DE-NI` | Niedersachsen |
| `DE-BY` | Bayern | `DE-NW` | Nordrhein-Westfalen |
| `DE-BE` | Berlin | `DE-RP` | Rheinland-Pfalz |
| `DE-BB` | Brandenburg | `DE-SL` | Saarland |
| `DE-HB` | Bremen | `DE-SN` | Sachsen |
| `DE-HH` | Hamburg | `DE-ST` | Sachsen-Anhalt |
| `DE-HE` | Hessen | `DE-SH` | Schleswig-Holstein |
| `DE-MV` | Mecklenburg-Vorpommern | `DE-TH` | Thüringen |

### Austria (`AT`)

`AT-1` Burgenland · `AT-2` Kärnten · `AT-3` Niederösterreich · `AT-4` Oberösterreich · `AT-5` Salzburg · `AT-6` Steiermark · `AT-7` Tirol · `AT-8` Vorarlberg · `AT-9` Wien

### Switzerland (`CH`)

`CH-AG` `CH-AI` `CH-AR` `CH-BE` `CH-BL` `CH-BS` `CH-FR` `CH-GE` `CH-GL` `CH-GR` `CH-JU` `CH-LU` `CH-NE` `CH-NW` `CH-OW` `CH-SG` `CH-SH` `CH-SO` `CH-SZ` `CH-TG` `CH-TI` `CH-UR` `CH-VD` `CH-VS` `CH-ZG` `CH-ZH`

## Notes on the data

- **Work-free vs. observed.** `type: 'public'` marks days that are legally work-free. Days that are regionally observed but not work-free — such as Austrian Landespatrone — are marked `type: 'regional'`. `isHoliday` and `getNextHoliday` count only `public`; `getHolidays` and `getHoliday` return all types.
- **Switzerland.** Only August 1 (Bundesfeier) is nationwide by federal law, so the bare `CH` alias returns just that day. Every other Swiss holiday is cantonal and listed against the cantons that observe it, including the ones observed in all 26.
- **Austria.** Good Friday is not a general public holiday; since the 2019 reform it is a "persönlicher Feiertag" rather than a work-free day.
- **Granularity.** Holidays observed only in parts of a region (e.g. Mariä Himmelfahrt in Bavaria, or partial-canton holidays in AG/GR/FR/SO) are modeled at the state/canton level. Sub-municipal variation is out of scope.
- **Dates** are computed in UTC to avoid timezone drift. Easter uses the Anonymous Gregorian algorithm (Meeus/Jones/Butcher), valid for the Gregorian calendar (1583 onward).

## Contributing

Issues and pull requests are welcome — especially corrections to holiday data backed by an official source. To work on the library:

```bash
npm install
npm test          # watch mode
npm run test:run  # single run
npm run typecheck
npm run lint
npm run build
```

## License

MIT © pouya1364

---

Looking for PLZ validation too? Check out [de-plz](https://www.npmjs.com/package/de-plz) — German postal code validation and federal state lookup.

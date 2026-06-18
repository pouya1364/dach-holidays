export type Country = 'DE' | 'AT' | 'CH'

export type GermanRegion =
  | 'DE-BW'
  | 'DE-BY'
  | 'DE-BE'
  | 'DE-BB'
  | 'DE-HB'
  | 'DE-HH'
  | 'DE-HE'
  | 'DE-MV'
  | 'DE-NI'
  | 'DE-NW'
  | 'DE-RP'
  | 'DE-SL'
  | 'DE-SN'
  | 'DE-ST'
  | 'DE-SH'
  | 'DE-TH'

export type AustrianRegion =
  | 'AT-1'
  | 'AT-2'
  | 'AT-3'
  | 'AT-4'
  | 'AT-5'
  | 'AT-6'
  | 'AT-7'
  | 'AT-8'
  | 'AT-9'

export type SwissRegion =
  | 'CH-AG'
  | 'CH-AI'
  | 'CH-AR'
  | 'CH-BE'
  | 'CH-BL'
  | 'CH-BS'
  | 'CH-FR'
  | 'CH-GE'
  | 'CH-GL'
  | 'CH-GR'
  | 'CH-JU'
  | 'CH-LU'
  | 'CH-NE'
  | 'CH-NW'
  | 'CH-OW'
  | 'CH-SG'
  | 'CH-SH'
  | 'CH-SO'
  | 'CH-SZ'
  | 'CH-TG'
  | 'CH-TI'
  | 'CH-UR'
  | 'CH-VD'
  | 'CH-VS'
  | 'CH-ZG'
  | 'CH-ZH'

export type Region = Country | GermanRegion | AustrianRegion | SwissRegion

export type HolidayType = 'public' | 'regional' | 'observance'

export interface HolidayName {
  de: string // German name (e.g. 'Erster Weihnachtstag')
  en: string // English name (e.g. 'Christmas Day')
  fr?: string // French name (only for Swiss French cantons)
  it?: string // Italian name (only for Ticino)
}

export interface Holiday {
  date: string // ISO date string, e.g. '2026-12-25'
  name: HolidayName
  type: HolidayType // public = legally non-working
  regions: Region[] // which regions observe this holiday
}

export interface HolidayWithCountdown extends Holiday {
  daysUntil: number // 0 = today, 1 = tomorrow
}

// Internal type used by the holiday definitions (not exported)
export type HolidayDefinition = {
  name: HolidayName
  type: HolidayType
  // Either a fixed date (month, day) OR a function that calculates the date from Easter
  date:
    | { type: 'fixed'; month: number; day: number }
    | { type: 'easter'; offsetDays: number }
    | { type: 'custom'; calculate: (year: number) => Date }
  regions: Region[]
}

export type PrayerCategory = 'wajib' | 'sunnah'

export interface Prayer {
  id: string
  title: string
  category: PrayerCategory
  arabicText: string
  latinText: string
  translation: string
}

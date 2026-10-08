export type MaterialCategory = 'quran' | 'hadis'

export interface TpaMaterial {
  id: string
  title: string
  category: MaterialCategory
  arabicText?: string
  latinText?: string
  translation?: string
  content?: string
}

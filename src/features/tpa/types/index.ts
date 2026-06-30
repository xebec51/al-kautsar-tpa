export type MaterialCategory = 'hafalan' | 'fiqh' | 'akidah' | 'akhlak' | 'tahsin'

export interface TpaMaterial {
  id: string
  title: string
  category: MaterialCategory
  arabicText?: string
  latinText?: string
  translation?: string
  content?: string
}

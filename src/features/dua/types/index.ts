export type DuaCategory =
  | 'makan'
  | 'tidur'
  | 'rumah'
  | 'kamar-mandi'
  | 'kendaraan'
  | 'masjid'
  | 'ibadah'
  | 'belajar'
  | 'keluarga'
  | 'pakaian'
  | 'kesehatan'

export interface Dua {
  id: string
  title: string
  arabicText: string
  latinText: string
  translation: string
  category: DuaCategory
}

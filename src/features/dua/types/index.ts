export type DuaCategory = 'makan' | 'tidur' | 'rumah' | 'kamar-mandi' | 'kendaraan' | 'masjid' | 'ibadah'

export interface Dua {
  id: string
  title: string
  arabicText: string
  latinText: string
  translation: string
  category: DuaCategory
}

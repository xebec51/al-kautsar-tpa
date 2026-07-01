import { createContext } from 'react'

export interface FontSettings {
  arabicSize: number
  latinSize: number
  meaningSize: number
  increaseArabicSize: () => void
  decreaseArabicSize: () => void
  increaseLatinSize: () => void
  decreaseLatinSize: () => void
  increaseMeaningSize: () => void
  decreaseMeaningSize: () => void
}

export const ARABIC_STEP = 8
export const ARABIC_MIN = 40
export const ARABIC_MAX = 220
export const ARABIC_DEFAULT = 140

export const LATIN_STEP = 4
export const LATIN_MIN = 24
export const LATIN_MAX = 64
export const LATIN_DEFAULT = 40

export const MEANING_STEP = 4
export const MEANING_MIN = 18
export const MEANING_MAX = 48
export const MEANING_DEFAULT = 32

export const LS_KEY = 'al-kautsar:font-settings'

export const FontSettingsContext = createContext<FontSettings | null>(null)

import { useEffect, useState } from 'react'
import {
  FontSettingsContext,
  ARABIC_STEP, ARABIC_MIN, ARABIC_MAX, ARABIC_DEFAULT,
  LATIN_STEP, LATIN_MIN, LATIN_MAX, LATIN_DEFAULT,
  MEANING_STEP, MEANING_MIN, MEANING_MAX, MEANING_DEFAULT,
  LS_KEY,
} from './FontSettingsContextDef'

export function FontSettingsProvider({ children }: { children: React.ReactNode }) {
  const [arabicSize, setArabicSize] = useState(ARABIC_DEFAULT)
  const [latinSize, setLatinSize] = useState(LATIN_DEFAULT)
  const [meaningSize, setMeaningSize] = useState(MEANING_DEFAULT)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>
        if (typeof saved.arabicSize === 'number') setArabicSize(saved.arabicSize)
        if (typeof saved.latinSize === 'number') setLatinSize(saved.latinSize)
        if (typeof saved.meaningSize === 'number') setMeaningSize(saved.meaningSize)
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ arabicSize, latinSize, meaningSize }))
  }, [arabicSize, latinSize, meaningSize])

  return (
    <FontSettingsContext.Provider
      value={{
        arabicSize,
        latinSize,
        meaningSize,
        increaseArabicSize: () => setArabicSize(n => Math.min(n + ARABIC_STEP, ARABIC_MAX)),
        decreaseArabicSize: () => setArabicSize(n => Math.max(n - ARABIC_STEP, ARABIC_MIN)),
        increaseLatinSize: () => setLatinSize(n => Math.min(n + LATIN_STEP, LATIN_MAX)),
        decreaseLatinSize: () => setLatinSize(n => Math.max(n - LATIN_STEP, LATIN_MIN)),
        increaseMeaningSize: () => setMeaningSize(n => Math.min(n + MEANING_STEP, MEANING_MAX)),
        decreaseMeaningSize: () => setMeaningSize(n => Math.max(n - MEANING_STEP, MEANING_MIN)),
      }}
    >
      {children}
    </FontSettingsContext.Provider>
  )
}

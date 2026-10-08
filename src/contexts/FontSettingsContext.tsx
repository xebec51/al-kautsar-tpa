import { useEffect, useState } from 'react'
import {
  FontSettingsContext,
  TITLE_STEP,
  TITLE_MIN,
  TITLE_MAX,
  TITLE_DEFAULT,
  ARABIC_STEP,
  ARABIC_MIN,
  ARABIC_MAX,
  ARABIC_DEFAULT,
  LATIN_STEP,
  LATIN_MIN,
  LATIN_MAX,
  LATIN_DEFAULT,
  MEANING_STEP,
  MEANING_MIN,
  MEANING_MAX,
  MEANING_DEFAULT,
  LS_KEY,
} from './FontSettingsContextDef'

export function FontSettingsProvider({ children }: { children: React.ReactNode }) {
  const [titleSize, setTitleSize] = useState(TITLE_DEFAULT)
  const [arabicSize, setArabicSize] = useState(ARABIC_DEFAULT)
  const [latinSize, setLatinSize] = useState(LATIN_DEFAULT)
  const [meaningSize, setMeaningSize] = useState(MEANING_DEFAULT)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>
        if (typeof saved.titleSize === 'number') setTitleSize(saved.titleSize)
        if (typeof saved.arabicSize === 'number') setArabicSize(saved.arabicSize)
        if (typeof saved.latinSize === 'number') setLatinSize(saved.latinSize)
        if (typeof saved.meaningSize === 'number') setMeaningSize(saved.meaningSize)
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ titleSize, arabicSize, latinSize, meaningSize }))
  }, [titleSize, arabicSize, latinSize, meaningSize])

  return (
    <FontSettingsContext.Provider
      value={{
        titleSize,
        arabicSize,
        latinSize,
        meaningSize,
        increaseTitleSize: () => setTitleSize((n) => Math.min(n + TITLE_STEP, TITLE_MAX)),
        decreaseTitleSize: () => setTitleSize((n) => Math.max(n - TITLE_STEP, TITLE_MIN)),
        increaseArabicSize: () => setArabicSize((n) => Math.min(n + ARABIC_STEP, ARABIC_MAX)),
        decreaseArabicSize: () => setArabicSize((n) => Math.max(n - ARABIC_STEP, ARABIC_MIN)),
        increaseLatinSize: () => setLatinSize((n) => Math.min(n + LATIN_STEP, LATIN_MAX)),
        decreaseLatinSize: () => setLatinSize((n) => Math.max(n - LATIN_STEP, LATIN_MIN)),
        increaseMeaningSize: () => setMeaningSize((n) => Math.min(n + MEANING_STEP, MEANING_MAX)),
        decreaseMeaningSize: () => setMeaningSize((n) => Math.max(n - MEANING_STEP, MEANING_MIN)),
      }}
    >
      {children}
    </FontSettingsContext.Provider>
  )
}

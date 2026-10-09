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
import type { FontSizeField, FontSizes } from './FontSettingsContextDef'

interface StoredFontSettings {
  version: 2
  defaults: FontSizes
  items: Record<string, FontSizes>
}

const FIELD_LIMITS: Record<FontSizeField, { step: number; min: number; max: number }> = {
  titleSize: { step: TITLE_STEP, min: TITLE_MIN, max: TITLE_MAX },
  arabicSize: { step: ARABIC_STEP, min: ARABIC_MIN, max: ARABIC_MAX },
  latinSize: { step: LATIN_STEP, min: LATIN_MIN, max: LATIN_MAX },
  meaningSize: { step: MEANING_STEP, min: MEANING_MIN, max: MEANING_MAX },
}

export function FontSettingsProvider({ children }: { children: React.ReactNode }) {
  const [titleSize, setTitleSize] = useState(TITLE_DEFAULT)
  const [arabicSize, setArabicSize] = useState(ARABIC_DEFAULT)
  const [latinSize, setLatinSize] = useState(LATIN_DEFAULT)
  const [meaningSize, setMeaningSize] = useState(MEANING_DEFAULT)
  const [itemSizes, setItemSizes] = useState<Record<string, FontSizes>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>
        const defaults = saved.defaults as Record<string, unknown> | undefined
        if (saved.version === 2 && defaults) {
          if (typeof defaults.titleSize === 'number') setTitleSize(defaults.titleSize)
          if (typeof defaults.arabicSize === 'number') setArabicSize(defaults.arabicSize)
          if (typeof defaults.latinSize === 'number') setLatinSize(defaults.latinSize)
          if (typeof defaults.meaningSize === 'number') setMeaningSize(defaults.meaningSize)
          if (saved.items && typeof saved.items === 'object') {
            setItemSizes(saved.items as Record<string, FontSizes>)
          }
        } else {
          if (typeof saved.titleSize === 'number') setTitleSize(saved.titleSize)
          if (typeof saved.arabicSize === 'number') setArabicSize(saved.arabicSize)
          if (typeof saved.latinSize === 'number') setLatinSize(saved.latinSize)
          if (typeof saved.meaningSize === 'number') setMeaningSize(saved.meaningSize)
        }
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    const stored: StoredFontSettings = {
      version: 2,
      defaults: { titleSize, arabicSize, latinSize, meaningSize },
      items: itemSizes,
    }
    localStorage.setItem(LS_KEY, JSON.stringify(stored))
  }, [titleSize, arabicSize, latinSize, meaningSize, itemSizes])

  const defaultSizes = { titleSize, arabicSize, latinSize, meaningSize }

  function getItemSizes(itemKey: string): FontSizes {
    return itemSizes[itemKey] ?? defaultSizes
  }

  function adjustItemSize(itemKey: string, field: FontSizeField, direction: 1 | -1) {
    const { step, min, max } = FIELD_LIMITS[field]
    setItemSizes((currentItems) => {
      const currentSizes = currentItems[itemKey] ?? defaultSizes
      const nextValue = Math.min(max, Math.max(min, currentSizes[field] + step * direction))

      return {
        ...currentItems,
        [itemKey]: { ...currentSizes, [field]: nextValue },
      }
    })
  }

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
        getItemSizes,
        increaseItemSize: (itemKey, field) => adjustItemSize(itemKey, field, 1),
        decreaseItemSize: (itemKey, field) => adjustItemSize(itemKey, field, -1),
      }}
    >
      {children}
    </FontSettingsContext.Provider>
  )
}

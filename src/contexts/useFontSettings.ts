import { useContext } from 'react'
import { FontSettingsContext } from './FontSettingsContextDef'
import type { FontSettings } from './FontSettingsContextDef'

export function useFontSettings(): FontSettings {
  const ctx = useContext(FontSettingsContext)
  if (!ctx) throw new Error('useFontSettings must be used within FontSettingsProvider')
  return ctx
}

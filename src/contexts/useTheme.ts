import { useContext } from 'react'
import { ThemeContext } from './ThemeContextDef'
import type { ThemeSettings } from './ThemeContextDef'

export function useTheme(): ThemeSettings {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

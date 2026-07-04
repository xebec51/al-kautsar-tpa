import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeSettings {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const LS_THEME_KEY = 'al-kautsar:theme'

export const ThemeContext = createContext<ThemeSettings | null>(null)

import { useEffect, useLayoutEffect, useState } from 'react'
import { ThemeContext, LS_THEME_KEY } from './ThemeContextDef'
import type { Theme } from './ThemeContextDef'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(LS_THEME_KEY)
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      // ignore
    }
    return 'dark'
  })

  // Apply theme attribute synchronously before paint to prevent flash
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Persist preference to localStorage
  useEffect(() => {
    localStorage.setItem(LS_THEME_KEY, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { FontSettingsProvider } from '@/contexts/FontSettingsContext'

export function App() {
  return (
    <ThemeProvider>
      <FontSettingsProvider>
        <RouterProvider router={router} />
      </FontSettingsProvider>
    </ThemeProvider>
  )
}

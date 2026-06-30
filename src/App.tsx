import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { FontSettingsProvider } from '@/contexts/FontSettingsContext'

export function App() {
  return (
    <FontSettingsProvider>
      <RouterProvider router={router} />
    </FontSettingsProvider>
  )
}

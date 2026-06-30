import { FocusProvider } from '@/navigation/FocusContext'
import { TVLayout } from '@/layouts/TVLayout'
import { HomePage } from '@/pages/HomePage'

export function App() {
  return (
    <FocusProvider>
      <TVLayout>
        <HomePage />
      </TVLayout>
    </FocusProvider>
  )
}

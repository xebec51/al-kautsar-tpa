import { Outlet, useNavigate } from 'react-router-dom'
import { FocusProvider } from '@/navigation/FocusContext'
import { TVLayout } from './TVLayout'

export function RootLayout() {
  const navigate = useNavigate()

  return (
    <FocusProvider>
      <TVLayout onBack={() => navigate(-1)}>
        <Outlet />
      </TVLayout>
    </FocusProvider>
  )
}

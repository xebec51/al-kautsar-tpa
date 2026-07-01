import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { PrayerListPage } from '@/features/prayer/pages/PrayerListPage'
import { PrayerDetailPage } from '@/features/prayer/pages/PrayerDetailPage'
import { DuaListPage } from '@/features/dua/pages/DuaListPage'
import { DuaDetailPage } from '@/features/dua/pages/DuaDetailPage'
import { MaterialListPage } from '@/features/tpa/pages/MaterialListPage'
import { MaterialDetailPage } from '@/features/tpa/pages/MaterialDetailPage'
import { AdminPage } from '@/features/admin/pages/AdminPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'prayer', element: <PrayerListPage /> },
      { path: 'prayer/:id', element: <PrayerDetailPage /> },
      { path: 'dua', element: <DuaListPage /> },
      { path: 'dua/:id', element: <DuaDetailPage /> },
      { path: 'material', element: <MaterialListPage /> },
      { path: 'material/:id', element: <MaterialDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  // Admin dashboard: desktop-only, outside TV layout
  {
    path: '/admin',
    element: <AdminPage />,
  },
])

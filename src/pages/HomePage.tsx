import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'

const menuItems = [
  {
    id: 'menu-prayer',
    arabicLabel: 'الصَّلَاةُ',
    title: 'Bacaan Shalat',
    description: 'Bacaan dan tata cara shalat',
    route: '/prayer',
  },
  {
    id: 'menu-dua',
    arabicLabel: 'الدُّعَاءُ',
    title: 'Doa Harian',
    description: 'Doa-doa harian beserta artinya',
    route: '/dua',
  },
  {
    id: 'menu-material',
    arabicLabel: 'الْعِلْمُ',
    title: 'Materi TPA',
    description: 'Materi pembelajaran santri',
    route: '/material',
  },
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col px-[5%]">
      {/* Header */}
      <div className="flex items-center justify-between py-tv-6 shrink-0 border-b border-border">
        <div>
          <Typography variant="label">Masjid Al-Kautsar</Typography>
          <Typography variant="heading" className="mt-tv-1">
            Media Pembelajaran TPA
          </Typography>
        </div>
        <Button id="home-settings" variant="secondary" onClick={() => navigate('/settings')}>
          Pengaturan
        </Button>
      </div>

      {/* Feature cards */}
      <div className="flex-1 flex items-center py-tv-6">
        <div className="grid grid-cols-3 gap-tv-6 w-full h-[62vh]">
          {menuItems.map((item) => (
            <Card key={item.id} id={item.id} onClick={() => navigate(item.route)}>
              <div className="flex flex-col items-center justify-center text-center h-full gap-tv-4">
                <p className="font-arabic text-tv-3xl text-accent leading-none">
                  {item.arabicLabel}
                </p>
                <div>
                  <Typography variant="title" className="mb-tv-1">
                    {item.title}
                  </Typography>
                  <Typography variant="caption">{item.description}</Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

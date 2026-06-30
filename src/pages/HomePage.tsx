import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Panel } from '@/components/ui/Panel'

const menuItems = [
  {
    id: 'menu-prayer',
    title: 'Bacaan Shalat',
    description: 'Bacaan dan tata cara shalat',
  },
  {
    id: 'menu-dua',
    title: 'Doa Harian',
    description: 'Doa-doa harian beserta artinya',
  },
  {
    id: 'menu-material',
    title: 'Materi TPA',
    description: 'Materi pembelajaran santri',
  },
]

export function HomePage() {
  function handleMenuSelect(id: string) {
    console.log('[HomePage] Menu selected:', id)
  }

  function handleStart() {
    console.log('[HomePage] Mulai pressed')
  }

  function handleSettings() {
    console.log('[HomePage] Pengaturan pressed')
  }

  return (
    <Container className="flex flex-col justify-center h-full py-tv-12">
      <Panel className="mb-tv-8">
        <Typography variant="label" className="mb-tv-2">
          Masjid Al-Kautsar
        </Typography>
        <Typography variant="display">Selamat Datang</Typography>
        <Typography variant="caption" className="mt-tv-2">
          Pilih materi yang ingin dipelajari
        </Typography>
      </Panel>

      <div className="grid grid-cols-3 gap-tv-4 mb-tv-8">
        {menuItems.map((item) => (
          <Card key={item.id} id={item.id} onClick={() => handleMenuSelect(item.id)}>
            <Typography variant="title" className="mb-tv-2">
              {item.title}
            </Typography>
            <Typography variant="caption">{item.description}</Typography>
          </Card>
        ))}
      </div>

      <div className="flex gap-tv-4 max-w-[600px]">
        <Button id="btn-start" variant="primary" onClick={handleStart}>
          Mulai
        </Button>
        <Button id="btn-settings" variant="secondary" onClick={handleSettings}>
          Pengaturan
        </Button>
      </div>
    </Container>
  )
}

import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import duas from '../data/duas.json'

const CATEGORY_LABELS: Record<string, string> = {
  makan: 'Makan',
  tidur: 'Tidur',
  rumah: 'Rumah',
  'kamar-mandi': 'Kamar Mandi',
  kendaraan: 'Kendaraan',
  masjid: 'Masjid',
  ibadah: 'Ibadah',
}

export function DuaListPage() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col h-full py-tv-8">
      <div className="flex items-center gap-tv-4 mb-tv-6">
        <Button id="dua-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Doa Harian</Typography>
      </div>

      <div className="grid grid-cols-2 gap-tv-3 overflow-hidden">
        {duas.map((dua) => (
          <Card key={dua.id} id={`dua-${dua.id}`} onClick={() => navigate(`/dua/${dua.id}`)}>
            <Typography variant="title" className="mb-tv-1">
              {dua.title}
            </Typography>
            <Typography variant="label">{CATEGORY_LABELS[dua.category] ?? dua.category}</Typography>
          </Card>
        ))}
      </div>
    </Container>
  )
}

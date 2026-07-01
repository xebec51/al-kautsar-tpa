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
  belajar: 'Belajar',
  keluarga: 'Keluarga',
}

export function DuaListPage() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col h-full py-tv-6">
      <div className="flex items-center gap-tv-4 mb-tv-4">
        <Button id="dua-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Doa Harian</Typography>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide py-2">
        <div className="grid grid-cols-3 gap-tv-3">
          {duas.map((dua) => (
            <Card key={dua.id} id={`dua-${dua.id}`} compact onClick={() => navigate(`/dua/${dua.id}`)}>
              <p className="text-tv-base font-semibold text-text-primary mb-tv-1">{dua.title}</p>
              <p className="text-tv-xs font-medium text-text-muted uppercase tracking-wider">
                {CATEGORY_LABELS[dua.category] ?? dua.category}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  )
}

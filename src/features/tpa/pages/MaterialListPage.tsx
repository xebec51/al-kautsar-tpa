import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import materials from '../data/materials.json'

const CATEGORY_LABELS: Record<string, string> = {
  hafalan: 'Hafalan',
  fiqh: 'Fiqh',
  akidah: 'Akidah',
  akhlak: 'Akhlak',
  tahsin: 'Tahsin',
}

export function MaterialListPage() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col h-full py-tv-6">
      <div className="flex items-center gap-tv-4 mb-tv-4">
        <Button id="material-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Materi TPA</Typography>
      </div>

      <div className="grid grid-cols-3 gap-tv-3 overflow-hidden">
        {materials.map((material) => (
          <Card
            key={material.id}
            id={`material-${material.id}`}
            compact
            onClick={() => navigate(`/material/${material.id}`)}
          >
            <p className="text-tv-lg font-semibold text-text-primary mb-tv-1">{material.title}</p>
            <p className="text-tv-xs font-medium text-text-muted uppercase tracking-wider">
              {CATEGORY_LABELS[material.category] ?? material.category}
            </p>
          </Card>
        ))}
      </div>
    </Container>
  )
}

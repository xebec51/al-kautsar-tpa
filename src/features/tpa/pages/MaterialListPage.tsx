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
    <Container className="flex flex-col h-full py-tv-8">
      <div className="flex items-center gap-tv-4 mb-tv-6">
        <Button id="material-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Materi TPA</Typography>
      </div>

      <div className="grid grid-cols-2 gap-tv-3 overflow-hidden">
        {materials.map((material) => (
          <Card
            key={material.id}
            id={`material-${material.id}`}
            onClick={() => navigate(`/material/${material.id}`)}
          >
            <Typography variant="title" className="mb-tv-1">
              {material.title}
            </Typography>
            <Typography variant="label">
              {CATEGORY_LABELS[material.category] ?? material.category}
            </Typography>
          </Card>
        ))}
      </div>
    </Container>
  )
}

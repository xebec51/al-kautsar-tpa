import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import prayers from '../data/prayers.json'

export function PrayerListPage() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col h-full py-tv-8">
      <div className="flex items-center gap-tv-4 mb-tv-6">
        <Button id="prayer-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Bacaan Shalat</Typography>
      </div>

      <div className="grid grid-cols-2 gap-tv-3 overflow-hidden">
        {prayers.map((prayer) => (
          <Card
            key={prayer.id}
            id={`prayer-${prayer.id}`}
            onClick={() => navigate(`/prayer/${prayer.id}`)}
          >
            <Typography variant="title" className="mb-tv-1">
              {prayer.title}
            </Typography>
            <Typography variant="label">
              {prayer.category === 'wajib' ? 'Wajib' : 'Sunnah'}
            </Typography>
          </Card>
        ))}
      </div>
    </Container>
  )
}

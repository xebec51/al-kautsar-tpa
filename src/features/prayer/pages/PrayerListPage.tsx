import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import prayers from '../data/prayers.json'

export function PrayerListPage() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col h-full py-tv-6">
      <div className="flex items-center gap-tv-4 mb-tv-4">
        <Button id="prayer-list-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Bacaan Shalat</Typography>
      </div>

      <div className="grid grid-cols-3 gap-tv-3">
        {prayers.map((prayer) => (
          <Card
            key={prayer.id}
            id={`prayer-${prayer.id}`}
            compact
            onClick={() => navigate(`/prayer/${prayer.id}`)}
          >
            <p className="text-tv-lg font-semibold text-text-primary mb-tv-1">{prayer.title}</p>
            <p className="text-tv-xs font-medium text-text-muted uppercase tracking-wider">
              {prayer.category === 'wajib' ? 'Wajib' : 'Sunnah'}
            </p>
          </Card>
        ))}
      </div>
    </Container>
  )
}

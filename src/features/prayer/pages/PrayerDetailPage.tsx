import { useNavigate, useParams } from 'react-router-dom'
import { DetailPageLayout } from '@/layouts/DetailPageLayout'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Typography } from '@/components/ui/Typography'
import prayers from '../data/prayers.json'

export function PrayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentIndex = prayers.findIndex((p) => p.id === id)
  const prayer = prayers[currentIndex]
  const prev = currentIndex > 0 ? prayers[currentIndex - 1] : null
  const next = currentIndex < prayers.length - 1 ? prayers[currentIndex + 1] : null

  if (!prayer) {
    return (
      <Container className="flex flex-col items-center justify-center h-full gap-tv-4">
        <Typography variant="heading">Bacaan tidak ditemukan</Typography>
        <Button id="prayer-not-found-back" onClick={() => navigate('/prayer')}>
          ← Kembali
        </Button>
      </Container>
    )
  }

  return (
    <DetailPageLayout
      title={prayer.title}
      position={{ current: currentIndex + 1, total: prayers.length }}
      arabicText={prayer.arabicText}
      latinText={prayer.latinText}
      translation={prayer.translation}
      prevTitle={prev?.title}
      nextTitle={next?.title}
      onBack={() => navigate('/prayer')}
      onPrev={prev ? () => navigate(`/prayer/${prev.id}`) : undefined}
      onNext={next ? () => navigate(`/prayer/${next.id}`) : undefined}
    />
  )
}

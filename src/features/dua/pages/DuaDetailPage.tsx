import { useNavigate, useParams } from 'react-router-dom'
import { DetailPageLayout } from '@/layouts/DetailPageLayout'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Typography } from '@/components/ui/Typography'
import duas from '../data/duas.json'

export function DuaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentIndex = duas.findIndex((d) => d.id === id)
  const dua = duas[currentIndex]
  const prev = currentIndex > 0 ? duas[currentIndex - 1] : null
  const next = currentIndex < duas.length - 1 ? duas[currentIndex + 1] : null

  if (!dua) {
    return (
      <Container className="flex flex-col items-center justify-center h-full gap-tv-4">
        <Typography variant="heading">Doa tidak ditemukan</Typography>
        <Button id="dua-not-found-back" onClick={() => navigate('/dua')}>
          ← Kembali
        </Button>
      </Container>
    )
  }

  return (
    <DetailPageLayout
      title={dua.title}
      position={{ current: currentIndex + 1, total: duas.length }}
      arabicText={dua.arabicText}
      latinText={dua.latinText}
      translation={dua.translation}
      prevTitle={prev?.title}
      nextTitle={next?.title}
      onBack={() => navigate('/dua')}
      onPrev={prev ? () => navigate(`/dua/${prev.id}`) : undefined}
      onNext={next ? () => navigate(`/dua/${next.id}`) : undefined}
    />
  )
}

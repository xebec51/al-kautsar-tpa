import { useNavigate, useParams } from 'react-router-dom'
import { DetailPageLayout } from '@/layouts/DetailPageLayout'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Typography } from '@/components/ui/Typography'
import materials from '../data/materials.json'
import type { TpaMaterial } from '../types'

const materialList = materials as TpaMaterial[]

export function MaterialDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentIndex = materialList.findIndex((m) => m.id === id)
  const material = materialList[currentIndex]
  const prev = currentIndex > 0 ? materialList[currentIndex - 1] : null
  const next = currentIndex < materialList.length - 1 ? materialList[currentIndex + 1] : null

  if (!material) {
    return (
      <Container className="flex flex-col items-center justify-center h-full gap-tv-4">
        <Typography variant="heading">Materi tidak ditemukan</Typography>
        <Button id="material-not-found-back" onClick={() => navigate('/material')}>
          ← Kembali
        </Button>
      </Container>
    )
  }

  return (
    <DetailPageLayout
      settingsKey={`material:${material.id}`}
      title={material.title}
      position={{ current: currentIndex + 1, total: materialList.length }}
      arabicText={material.arabicText}
      latinText={material.latinText}
      translation={material.translation}
      content={material.content}
      prevTitle={prev?.title}
      nextTitle={next?.title}
      onBack={() => navigate('/material')}
      onPrev={prev ? () => navigate(`/material/${prev.id}`) : undefined}
      onNext={next ? () => navigate(`/material/${next.id}`) : undefined}
    />
  )
}

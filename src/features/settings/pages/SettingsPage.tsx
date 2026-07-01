import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FocusRing } from '@/components/ui/FocusRing'
import { Panel } from '@/components/ui/Panel'
import { Typography } from '@/components/ui/Typography'
import { useFontSettings } from '@/contexts/useFontSettings'
import { useFocusable } from '@/navigation/useFocusable'

const BTN =
  'w-20 h-20 bg-overlay border border-border rounded-tv text-tv-xl font-bold text-text-primary cursor-pointer flex items-center justify-center select-none'

interface FontRowProps {
  label: string
  value: number
  decId: string
  incId: string
  onDecrease: () => void
  onIncrease: () => void
}

function FontRow({ label, value, decId, incId, onDecrease, onIncrease }: FontRowProps) {
  const dec = useFocusable<HTMLButtonElement>(decId)
  const inc = useFocusable<HTMLButtonElement>(incId)
  return (
    <div className="flex items-center justify-between gap-tv-4 py-tv-2">
      <span className="text-tv-base text-text-secondary flex-1">{label}</span>
      <div className="flex items-center gap-tv-3">
        <FocusRing active={dec.isFocused} className="rounded-tv">
          <button ref={dec.ref} onClick={onDecrease} className={BTN}>
            −
          </button>
        </FocusRing>
        <span className="text-tv-base text-text-primary w-28 text-center tabular-nums">
          {value}px
        </span>
        <FocusRing active={inc.isFocused} className="rounded-tv">
          <button ref={inc.ref} onClick={onIncrease} className={BTN}>
            +
          </button>
        </FocusRing>
      </div>
    </div>
  )
}

export function SettingsPage() {
  const navigate = useNavigate()
  const {
    arabicSize,
    latinSize,
    meaningSize,
    increaseArabicSize,
    decreaseArabicSize,
    increaseLatinSize,
    decreaseLatinSize,
    increaseMeaningSize,
    decreaseMeaningSize,
  } = useFontSettings()

  return (
    <Container className="flex flex-col h-full py-tv-6">
      <div className="flex items-center gap-tv-4 mb-tv-6">
        <Button id="settings-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Pengaturan</Typography>
      </div>

      <div className="flex flex-col gap-tv-6 max-w-[960px]">
        <Panel>
          <Typography variant="title" className="mb-tv-4">
            Ukuran Font
          </Typography>
          <div className="flex flex-col divide-y divide-border">
            <FontRow
              label="Bahasa Arab"
              value={arabicSize}
              decId="settings-arabic-dec"
              incId="settings-arabic-inc"
              onDecrease={decreaseArabicSize}
              onIncrease={increaseArabicSize}
            />
            <FontRow
              label="Latin"
              value={latinSize}
              decId="settings-latin-dec"
              incId="settings-latin-inc"
              onDecrease={decreaseLatinSize}
              onIncrease={increaseLatinSize}
            />
            <FontRow
              label="Terjemahan"
              value={meaningSize}
              decId="settings-meaning-dec"
              incId="settings-meaning-inc"
              onDecrease={decreaseMeaningSize}
              onIncrease={increaseMeaningSize}
            />
          </div>
        </Panel>

        <Panel>
          <Typography variant="title" className="mb-tv-2">
            Tentang Aplikasi
          </Typography>
          <Typography variant="body" className="text-text-secondary mt-tv-2">
            Al-Kautsar TPA
          </Typography>
          <Typography variant="caption" className="text-text-muted mt-tv-1">
            Media pembelajaran TPA Masjid Al-Kautsar. Dioptimalkan untuk Smart TV VIDAA.
          </Typography>
        </Panel>
      </div>
    </Container>
  )
}

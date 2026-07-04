import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FocusRing } from '@/components/ui/FocusRing'
import { Panel } from '@/components/ui/Panel'
import { Typography } from '@/components/ui/Typography'
import { useFontSettings } from '@/contexts/useFontSettings'
import { useTheme } from '@/contexts/useTheme'
import type { Theme } from '@/contexts/ThemeContextDef'
import { focusManager } from '@/navigation/FocusManager'
import { useFocusable } from '@/navigation/useFocusable'

// ─── Theme button ─────────────────────────────────────────────────────────────

interface ThemeButtonProps {
  id: string
  label: string
  active: boolean
  onClick: () => void
}

function ThemeButton({ id, label, active, onClick }: ThemeButtonProps) {
  const { ref, isFocused } = useFocusable<HTMLButtonElement>(id)
  return (
    <FocusRing active={isFocused} className="rounded-tv flex-1">
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'w-full py-tv-4 rounded-tv text-tv-base font-semibold cursor-pointer border transition-colors',
          active
            ? 'bg-accent text-text-inverse border-accent'
            : 'bg-overlay text-text-secondary border-border'
        )}
      >
        {label}
      </button>
    </FocusRing>
  )
}

// ─── Font row ─────────────────────────────────────────────────────────────────

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
    <div className="flex items-center justify-between gap-tv-4 py-tv-3">
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'dark', label: 'Gelap' },
  { value: 'light', label: 'Terang' },
]

export function SettingsPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
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

  // Ensure focus lands on back button when page mounts
  useEffect(() => {
    requestAnimationFrame(() => {
      focusManager.setFocus('settings-back')
    })
  }, [])

  return (
    <Container className="flex flex-col h-full py-tv-6">
      <div className="flex items-center gap-tv-4 mb-tv-6 shrink-0">
        <Button id="settings-back" variant="ghost" onClick={() => navigate('/')}>
          ← Kembali
        </Button>
        <Typography variant="heading">Pengaturan</Typography>
      </div>

      <div className="flex flex-col gap-tv-6 max-w-[960px]">
        {/* Theme */}
        <Panel>
          <Typography variant="title" className="mb-tv-4">
            Tema Tampilan
          </Typography>
          <div className="flex gap-tv-4">
            {THEME_OPTIONS.map((opt) => (
              <ThemeButton
                key={opt.value}
                id={`settings-theme-${opt.value}`}
                label={opt.label}
                active={theme === opt.value}
                onClick={() => setTheme(opt.value)}
              />
            ))}
          </div>
        </Panel>

        {/* Font sizes */}
        <Panel>
          <Typography variant="title" className="mb-tv-2">
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
      </div>
    </Container>
  )
}

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { FocusRing } from '@/components/ui/FocusRing'
import { useFocusable } from '@/navigation/useFocusable'
import { focusManager } from '@/navigation/FocusManager'
import { useFontSettings } from '@/contexts/useFontSettings'

// Navigation grid — rows top-to-bottom, columns left-to-right
const MODAL_GRID: string[][] = [
  ['font-modal-arabic-dec', 'font-modal-arabic-inc'],
  ['font-modal-latin-dec', 'font-modal-latin-inc'],
  ['font-modal-meaning-dec', 'font-modal-meaning-inc'],
  ['font-modal-close'],
]

function navigateGrid(currentId: string, direction: 'up' | 'down' | 'left' | 'right'): string {
  let row = -1
  let col = -1
  for (let r = 0; r < MODAL_GRID.length; r++) {
    const c = MODAL_GRID[r].indexOf(currentId)
    if (c >= 0) {
      row = r
      col = c
      break
    }
  }
  if (row === -1) return currentId
  switch (direction) {
    case 'up':
      if (row === 0) return currentId
      return MODAL_GRID[row - 1][Math.min(col, MODAL_GRID[row - 1].length - 1)]
    case 'down':
      if (row >= MODAL_GRID.length - 1) return currentId
      return MODAL_GRID[row + 1][Math.min(col, MODAL_GRID[row + 1].length - 1)]
    case 'left':
      if (col === 0) return currentId
      return MODAL_GRID[row][col - 1]
    case 'right':
      if (col >= MODAL_GRID[row].length - 1) return currentId
      return MODAL_GRID[row][col + 1]
  }
}

const BTN_BASE =
  'w-20 h-20 bg-overlay border border-border rounded-tv text-tv-xl font-bold text-text-primary cursor-pointer flex items-center justify-center select-none'

interface SettingsRowProps {
  label: string
  value: number
  decId: string
  incId: string
  onDecrease: () => void
  onIncrease: () => void
}

function SettingsRow({ label, value, decId, incId, onDecrease, onIncrease }: SettingsRowProps) {
  const dec = useFocusable<HTMLButtonElement>(decId)
  const inc = useFocusable<HTMLButtonElement>(incId)
  return (
    <div className="flex items-center justify-between gap-tv-4">
      <span className="text-tv-sm text-text-secondary flex-1">{label}</span>
      <div className="flex items-center gap-tv-3">
        <FocusRing active={dec.isFocused} className="rounded-tv">
          <button ref={dec.ref} onClick={onDecrease} className={BTN_BASE}>
            −
          </button>
        </FocusRing>
        <span className="text-tv-sm text-text-primary w-28 text-center tabular-nums">
          {value}px
        </span>
        <FocusRing active={inc.isFocused} className="rounded-tv">
          <button ref={inc.ref} onClick={onIncrease} className={BTN_BASE}>
            +
          </button>
        </FocusRing>
      </div>
    </div>
  )
}

interface FontSettingsModalProps {
  onClose: () => void
}

export function FontSettingsModal({ onClose }: FontSettingsModalProps) {
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

  const closeBtn = useFocusable<HTMLButtonElement>('font-modal-close')

  // Entry animation: mount invisible, then transition to visible on next frame
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  // Auto-focus first button on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      focusManager.setFocus('font-modal-arabic-dec')
    })
  }, [])

  // Stable ref for onClose so keyboard handler doesn't need re-registration
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  // Capture-phase handler traps all keyboard events inside the modal.
  // DetailPageLayout yields (returns early) when modal is open, so this
  // handler fires second and calls stopImmediatePropagation to prevent
  // the TVLayout bubble handler from also responding.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      e.stopImmediatePropagation()
      e.preventDefault()

      const currentId = focusManager.getFocused() ?? 'font-modal-arabic-dec'

      switch (e.key) {
        case 'Escape':
          onCloseRef.current()
          break
        case 'ArrowUp':
          focusManager.setFocus(navigateGrid(currentId, 'up'))
          break
        case 'ArrowDown':
          focusManager.setFocus(navigateGrid(currentId, 'down'))
          break
        case 'ArrowLeft':
          focusManager.setFocus(navigateGrid(currentId, 'left'))
          break
        case 'ArrowRight':
          focusManager.setFocus(navigateGrid(currentId, 'right'))
          break
        case 'Enter':
          focusManager.triggerEnter()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={cn(
          'bg-panel border border-border rounded-tv-xl p-tv-8 w-[660px] shadow-tv-panel transition-all duration-300 ease-out',
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        <h2 className="text-tv-lg font-bold text-text-primary mb-tv-6">
          Pengaturan Ukuran Font
        </h2>

        <div className="flex flex-col gap-tv-4">
          <SettingsRow
            label="Bahasa Arab"
            value={arabicSize}
            decId="font-modal-arabic-dec"
            incId="font-modal-arabic-inc"
            onDecrease={decreaseArabicSize}
            onIncrease={increaseArabicSize}
          />
          <SettingsRow
            label="Latin"
            value={latinSize}
            decId="font-modal-latin-dec"
            incId="font-modal-latin-inc"
            onDecrease={decreaseLatinSize}
            onIncrease={increaseLatinSize}
          />
          <SettingsRow
            label="Terjemahan"
            value={meaningSize}
            decId="font-modal-meaning-dec"
            incId="font-modal-meaning-inc"
            onDecrease={decreaseMeaningSize}
            onIncrease={increaseMeaningSize}
          />
        </div>

        <div className="mt-tv-6 flex justify-center">
          <FocusRing active={closeBtn.isFocused} className="rounded-tv">
            <button
              ref={closeBtn.ref}
              onClick={onClose}
              className="px-tv-12 py-tv-3 bg-overlay border border-border rounded-tv text-tv-base font-semibold text-text-primary cursor-pointer"
            >
              Tutup
            </button>
          </FocusRing>
        </div>
      </div>
    </div>
  )
}

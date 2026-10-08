import { useEffect, useRef, useState } from 'react'
import { ArabicText } from '@/components/ui/ArabicText'
import { FocusRing } from '@/components/ui/FocusRing'
import { FontSettingsModal } from '@/components/ui/FontSettingsModal'
import { useFontSettings } from '@/contexts/useFontSettings'
import { useFocusable } from '@/navigation/useFocusable'
import { normalizeRemoteKey } from '@/navigation/RemoteKeyMap'

interface DetailPageLayoutProps {
  title: string
  position: { current: number; total: number }
  arabicText?: string
  latinText?: string
  translation?: string
  content?: string
  prevTitle?: string
  nextTitle?: string
  onBack: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function DetailPageLayout({
  title,
  position,
  arabicText,
  latinText,
  translation,
  content,
  prevTitle,
  nextTitle,
  onBack,
  onPrev,
  onNext,
}: DetailPageLayoutProps) {
  const { titleSize, latinSize, meaningSize } = useFontSettings()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Stable refs for callbacks
  const onBackRef = useRef(onBack)
  const onPrevRef = useRef(onPrev)
  const onNextRef = useRef(onNext)
  const isSettingsOpenRef = useRef(false)

  useEffect(() => {
    onBackRef.current = onBack
    onPrevRef.current = onPrev
    onNextRef.current = onNext
  })

  useEffect(() => {
    isSettingsOpenRef.current = isSettingsOpen
  }, [isSettingsOpen])

  // "Aa" settings button in header
  const {
    ref: aaRef,
    isFocused: aaFocused,
    focusSelf: focusAaBtn,
  } = useFocusable<HTMLButtonElement>('detail-font-settings-btn')

  const closeModal = () => {
    setIsSettingsOpen(false)
    // Return focus to the settings button after modal unmounts
    requestAnimationFrame(focusAaBtn)
  }

  // Capture-phase handler: fires before FocusManager's bubble-phase handler.
  // Yields entirely when the settings modal is open — the modal has its own handler
  // registered after this one, which calls stopImmediatePropagation to take over.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isSettingsOpenRef.current) return

      const action = normalizeRemoteKey(e)
      switch (action) {
        case 'LEFT':
        case 'BACK':
          e.stopImmediatePropagation()
          e.preventDefault()
          onBackRef.current()
          break
        case 'UP':
          e.stopImmediatePropagation()
          e.preventDefault()
          onPrevRef.current?.()
          break
        case 'DOWN':
          e.stopImmediatePropagation()
          e.preventDefault()
          onNextRef.current?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <header className="grid grid-cols-[1fr_minmax(0,3fr)_1fr] items-center gap-tv-4 px-[4%] pt-tv-4 pb-tv-3 shrink-0 border-b border-border">
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="text-tv-xs font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
          >
            ← Kembali
          </button>
        </div>

        <h1
          style={{ fontSize: `${titleSize}px` }}
          className="min-w-0 font-bold leading-tight text-text-primary text-center text-balance transition-all duration-300 ease-in-out"
        >
          {title}
        </h1>

        <div className="flex items-center justify-end gap-tv-3">
          <span className="text-tv-xs font-medium text-text-muted tabular-nums">
            {position.current} / {position.total}
          </span>
          <FocusRing active={aaFocused} className="rounded-tv-sm">
            <button
              ref={aaRef}
              onClick={() => setIsSettingsOpen(true)}
              className="min-w-20 px-tv-3 py-tv-2 bg-overlay border border-border rounded-tv-sm text-tv-xs font-bold text-text-secondary cursor-pointer"
              aria-label="Pengaturan ukuran teks"
            >
              Aa
            </button>
          </FocusRing>
        </div>
      </header>

      {/*
        Content: smart vertical centering via double flex-1 spacers.
        - Short content: spacers share remaining space equally → centered.
        - Long content: spacers shrink to 0 (min-h-0) → content starts at top,
          overflow clipped at bottom. First line is always visible.
      */}
      <main className="flex-1 min-h-0 overflow-hidden px-[5%] flex flex-col">
        <div className="flex-1 min-h-0" />

        {arabicText ? (
          <div className="w-full max-w-[92rem] mx-auto flex flex-col gap-tv-3 py-tv-3">
            <ArabicText text={arabicText} />

            {(latinText || translation) && (
              <div className="w-full max-w-[84rem] mx-auto pt-tv-3 border-t border-border flex flex-col gap-tv-2">
                {latinText && (
                  <p
                    style={{ fontSize: `${latinSize}px` }}
                    className="italic leading-relaxed text-text-secondary text-center transition-all duration-300 ease-in-out"
                  >
                    {latinText}
                  </p>
                )}
                {translation && (
                  <p
                    style={{ fontSize: `${meaningSize}px` }}
                    className="leading-relaxed text-text-primary text-center transition-all duration-300 ease-in-out"
                  >
                    {translation}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : content ? (
          <div className="w-full max-w-[72rem] mx-auto py-tv-4">
            <p className="text-tv-base text-text-primary whitespace-pre-wrap leading-relaxed text-center">
              {content}
            </p>
          </div>
        ) : null}

        <div className="flex-1 min-h-0" />
      </main>

      {/* Keep navigation available without competing with the current title. */}
      <footer className="grid grid-cols-2 items-center gap-tv-4 px-[4%] pb-tv-3 shrink-0">
        {prevTitle ? (
          <button
            onClick={onPrev}
            aria-label={`Bacaan sebelumnya: ${prevTitle}`}
            className="justify-self-start text-tv-xs font-medium text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
          >
            ↑ Sebelumnya
          </button>
        ) : (
          <span />
        )}
        {nextTitle ? (
          <button
            onClick={onNext}
            aria-label={`Bacaan berikutnya: ${nextTitle}`}
            className="justify-self-end text-tv-xs font-medium text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
          >
            Berikutnya ↓
          </button>
        ) : (
          <span />
        )}
      </footer>

      {isSettingsOpen && <FontSettingsModal onClose={closeModal} />}
    </div>
  )
}

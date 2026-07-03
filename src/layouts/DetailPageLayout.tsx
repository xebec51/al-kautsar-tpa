import { useEffect, useRef, useState } from 'react'
import { ArabicText } from '@/components/ui/ArabicText'
import { FocusRing } from '@/components/ui/FocusRing'
import { FontSettingsModal } from '@/components/ui/FontSettingsModal'
import { Typography } from '@/components/ui/Typography'
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
  const { latinSize, meaningSize } = useFontSettings()
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
  const { ref: aaRef, isFocused: aaFocused, focusSelf: focusAaBtn } = useFocusable<HTMLButtonElement>(
    'detail-font-settings-btn'
  )

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
      {/* Header: Kembali left | title absolutely centered | Aa+counter right */}
      <div className="relative flex items-center justify-between px-[4%] pt-tv-4 pb-tv-2 shrink-0">
        <button
          onClick={onBack}
          className="relative z-10 text-tv-sm text-text-muted cursor-pointer hover:text-text-primary transition-colors"
        >
          ← Kembali
        </button>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Typography as="h1" className="text-tv-3xl font-bold text-text-primary text-center">
            {title}
          </Typography>
        </div>

        <div className="relative z-10 flex items-center gap-tv-3">
          <FocusRing active={aaFocused} className="rounded-tv-sm">
            <button
              ref={aaRef}
              onClick={() => setIsSettingsOpen(true)}
              className="px-tv-3 py-tv-2 bg-overlay border border-border rounded-tv-sm text-tv-sm font-bold text-text-secondary cursor-pointer"
            >
              Aa
            </button>
          </FocusRing>
          <span className="text-tv-sm text-text-muted">
            {position.current} / {position.total}
          </span>
        </div>
      </div>

      {/*
        Content: smart vertical centering via double flex-1 spacers.
        - Short content: spacers share remaining space equally → centered.
        - Long content: spacers shrink to 0 (min-h-0) → content starts at top,
          overflow clipped at bottom. First line is always visible.
      */}
      <div className="flex-1 min-h-0 overflow-hidden px-[4%] flex flex-col">
        <div className="flex-1 min-h-0" />

        {arabicText ? (
          <div className="flex flex-col gap-tv-4 py-tv-4">
            <ArabicText text={arabicText} />
            {latinText && (
              <p
                style={{ fontSize: `${latinSize}px` }}
                className="italic text-text-secondary text-center transition-all duration-300 ease-in-out"
              >
                {latinText}
              </p>
            )}
            {translation && (
              <p
                style={{ fontSize: `${meaningSize}px` }}
                className="text-text-secondary text-center transition-all duration-300 ease-in-out"
              >
                {translation}
              </p>
            )}
          </div>
        ) : content ? (
          <div className="py-tv-4">
            <p className="text-tv-base text-text-primary whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </div>
        ) : null}

        <div className="flex-1 min-h-0" />
      </div>

      {/* Footer: navigation buttons */}
      <div className="flex items-center justify-between px-[4%] pb-tv-4 shrink-0">
        {prevTitle ? (
          <button
            onClick={onPrev}
            className="text-tv-sm text-text-muted cursor-pointer hover:text-text-primary transition-colors"
          >
            ↑ {prevTitle}
          </button>
        ) : (
          <span />
        )}
        {nextTitle ? (
          <button
            onClick={onNext}
            className="text-tv-sm text-text-muted cursor-pointer hover:text-text-primary transition-colors"
          >
            {nextTitle} ↓
          </button>
        ) : (
          <span />
        )}
      </div>

      {isSettingsOpen && <FontSettingsModal onClose={closeModal} />}
    </div>
  )
}

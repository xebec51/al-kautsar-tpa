import { useEffect, useRef } from 'react'
import { ArabicText } from '@/components/ui/ArabicText'
import { Typography } from '@/components/ui/Typography'

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
  const onBackRef = useRef(onBack)
  const onPrevRef = useRef(onPrev)
  const onNextRef = useRef(onNext)

  useEffect(() => {
    onBackRef.current = onBack
    onPrevRef.current = onPrev
    onNextRef.current = onNext
  })

  // Capture phase: intercepts before FocusManager's bubble-phase handler.
  // Left/Escape = back, Up = previous, Down = next.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowLeft':
        case 'Escape':
          e.stopImmediatePropagation()
          e.preventDefault()
          onBackRef.current()
          break
        case 'ArrowUp':
          e.stopImmediatePropagation()
          e.preventDefault()
          onPrevRef.current?.()
          break
        case 'ArrowDown':
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
      {/* Header: compact */}
      <div className="flex items-center justify-between px-[4%] pt-tv-4 pb-tv-2 shrink-0">
        <Typography variant="heading" className="text-text-primary font-bold">
          {title}
        </Typography>
        <span className="text-tv-sm text-text-muted">
          {position.current} / {position.total}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex flex-col px-[4%]">
        {arabicText ? (
          <>
            {/* Arabic: fills remaining space, text starts at top */}
            <div className="flex-1 min-h-0 overflow-hidden pt-tv-2">
              <ArabicText text={arabicText} />
            </div>

            {/* Latin + Translation: anchored to bottom of content area */}
            {(latinText || translation) && (
              <div className="shrink-0 pt-tv-4 pb-tv-4">
                {latinText && (
                  <p className="text-tv-lg italic text-text-secondary text-center">{latinText}</p>
                )}
                {translation && (
                  <p className="mt-tv-2 text-tv-base text-text-secondary text-center">
                    {translation}
                  </p>
                )}
              </div>
            )}
          </>
        ) : content ? (
          /* Text-only materials (fiqh, akhlak, akidah, tahsin) */
          <div className="flex-1 min-h-0 overflow-hidden pt-tv-2 pb-tv-4">
            <p className="text-tv-base text-text-primary whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </div>
        ) : null}
      </div>

      {/* Footer: subtle navigation hints */}
      <div className="flex items-center justify-between px-[4%] pb-tv-4 shrink-0">
        {prevTitle ? (
          <span className="text-tv-sm text-text-muted">↑ {prevTitle}</span>
        ) : (
          <span />
        )}
        {nextTitle ? (
          <span className="text-tv-sm text-text-muted">{nextTitle} ↓</span>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}

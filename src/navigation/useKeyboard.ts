import { useEffect, useRef } from 'react'
import { useFocusContext } from './useFocusContext'

export function useKeyboard(onBack?: () => void): void {
  const { moveFocus, triggerEnter } = useFocusContext()

  const onBackRef = useRef(onBack)
  useEffect(() => {
    onBackRef.current = onBack
  }, [onBack])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          moveFocus('up')
          break
        case 'ArrowDown':
          e.preventDefault()
          moveFocus('down')
          break
        case 'ArrowLeft':
          e.preventDefault()
          moveFocus('left')
          break
        case 'ArrowRight':
          e.preventDefault()
          moveFocus('right')
          break
        case 'Enter':
          e.preventDefault()
          triggerEnter()
          break
        case 'Escape':
          e.preventDefault()
          onBackRef.current?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveFocus, triggerEnter])
}

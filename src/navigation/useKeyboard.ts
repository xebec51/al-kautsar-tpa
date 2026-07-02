import { useEffect, useRef } from 'react'
import { useFocusContext } from './useFocusContext'
import { normalizeRemoteKey } from './RemoteKeyMap'

export function useKeyboard(onBack?: () => void): void {
  const { moveFocus, triggerEnter } = useFocusContext()

  const onBackRef = useRef(onBack)
  useEffect(() => {
    onBackRef.current = onBack
  }, [onBack])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const action = normalizeRemoteKey(e)
      switch (action) {
        case 'UP':
          e.preventDefault()
          moveFocus('up')
          break
        case 'DOWN':
          e.preventDefault()
          moveFocus('down')
          break
        case 'LEFT':
          e.preventDefault()
          moveFocus('left')
          break
        case 'RIGHT':
          e.preventDefault()
          moveFocus('right')
          break
        case 'ENTER':
          e.preventDefault()
          triggerEnter()
          break
        case 'BACK':
          e.preventDefault()
          onBackRef.current?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveFocus, triggerEnter])
}

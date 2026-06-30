import { useEffect, useState } from 'react'
import { useFocusContext } from '@/navigation/useFocusContext'

export function FocusDebugOverlay() {
  const { focusedId } = useFocusContext()
  const [lastKey, setLastKey] = useState<string>('')

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setLastKey(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="fixed bottom-tv-2 right-tv-2 bg-black/90 border border-focus-ring text-tv-xs font-mono p-tv-2 rounded-tv z-50 pointer-events-none min-w-[220px]">
      <div className="text-text-muted">
        Focus: <span className="text-accent">{focusedId ?? 'none'}</span>
      </div>
      <div className="text-text-muted">
        Key: <span className="text-accent">{lastKey || '—'}</span>
      </div>
    </div>
  )
}

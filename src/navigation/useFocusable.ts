import { useCallback, useEffect, useRef } from 'react'
import { useFocusContext } from './useFocusContext'

interface UseFocusableReturn<T extends HTMLElement> {
  ref: React.RefObject<T>
  isFocused: boolean
  focusSelf: () => void
}

export function useFocusable<T extends HTMLElement = HTMLElement>(
  id: string,
  section?: string
): UseFocusableReturn<T> {
  const ref = useRef<T>(null)
  const { focusedId, register, unregister, setFocus } = useFocusContext()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    register(id, element, section)
    return () => unregister(id)
  }, [id, section, register, unregister])

  const focusSelf = useCallback(() => setFocus(id), [id, setFocus])

  return { ref, isFocused: focusedId === id, focusSelf }
}

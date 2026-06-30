import { useCallback, useEffect, useMemo, useState } from 'react'
import { focusManager } from './FocusManager'
import { FocusContext } from './FocusContextDef'
import type { Direction } from '@/types'

interface FocusProviderProps {
  children: React.ReactNode
}

export function FocusProvider({ children }: FocusProviderProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null)

  useEffect(() => {
    focusManager.setOnChange(setFocusedId)
    return () => {
      focusManager.setOnChange(null)
      focusManager.reset()
    }
  }, [])

  const register = useCallback(
    (id: string, element: HTMLElement, section?: string) =>
      focusManager.register(id, element, section),
    []
  )

  const unregister = useCallback((id: string) => focusManager.unregister(id), [])

  const setFocus = useCallback((id: string) => focusManager.setFocus(id), [])

  const moveFocus = useCallback((direction: Direction) => focusManager.move(direction), [])

  const triggerEnter = useCallback(() => focusManager.triggerEnter(), [])

  const value = useMemo(
    () => ({ focusedId, register, unregister, setFocus, moveFocus, triggerEnter }),
    [focusedId, register, unregister, setFocus, moveFocus, triggerEnter]
  )

  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
}

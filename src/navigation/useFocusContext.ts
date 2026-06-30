import { useContext } from 'react'
import { FocusContext } from './FocusContextDef'
import type { FocusContextValue } from './FocusContextDef'

export function useFocusContext(): FocusContextValue {
  const ctx = useContext(FocusContext)
  if (!ctx) throw new Error('useFocusContext must be used within FocusProvider')
  return ctx
}

import { createContext } from 'react'
import type { Direction } from '@/types'

export interface FocusContextValue {
  focusedId: string | null
  register: (id: string, element: HTMLElement, section?: string) => void
  unregister: (id: string) => void
  setFocus: (id: string) => void
  moveFocus: (direction: Direction) => void
  triggerEnter: () => void
}

export const FocusContext = createContext<FocusContextValue | null>(null)

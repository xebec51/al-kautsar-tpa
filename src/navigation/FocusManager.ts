import type { Direction } from '@/types'

interface FocusEntry {
  element: HTMLElement
  section?: string
}

type FocusChangeCallback = (id: string | null) => void

const EDGE_EPSILON = 10
const SECONDARY_AXIS_WEIGHT = 0.5

class FocusManager {
  private registry = new Map<string, FocusEntry>()
  private currentId: string | null = null
  private onChangeCb: FocusChangeCallback | null = null
  private autoFocusPending = false

  setOnChange(cb: FocusChangeCallback | null): void {
    this.onChangeCb = cb
  }

  register(id: string, element: HTMLElement, section?: string): void {
    this.registry.set(id, { element, section })

    if (this.currentId === null && !this.autoFocusPending) {
      this.autoFocusPending = true
      requestAnimationFrame(() => {
        this.autoFocusPending = false
        if (this.currentId === null && this.registry.size > 0) {
          const keys = [...this.registry.keys()]
          if (keys.length > 0) this.setFocus(keys[0])
        }
      })
    }
  }

  unregister(id: string): void {
    this.registry.delete(id)
    if (this.currentId === id) {
      this.currentId = null
      this.onChangeCb?.(null)
    }
  }

  setFocus(id: string): void {
    if (!this.registry.has(id)) return
    this.currentId = id
    this.onChangeCb?.(id)
  }

  getFocused(): string | null {
    return this.currentId
  }

  triggerEnter(): void {
    if (!this.currentId) return
    const entry = this.registry.get(this.currentId)
    entry?.element.click()
  }

  move(direction: Direction): string | null {
    if (this.registry.size === 0) return null

    if (!this.currentId) {
      const keys = [...this.registry.keys()]
      if (keys.length > 0) {
        this.setFocus(keys[0])
        return keys[0]
      }
      return null
    }

    const currentEntry = this.registry.get(this.currentId)
    if (!currentEntry) return null

    const currentRect = currentEntry.element.getBoundingClientRect()
    const currentCenterX = currentRect.left + currentRect.width / 2
    const currentCenterY = currentRect.top + currentRect.height / 2

    let bestId: string | null = null
    let bestScore = Infinity

    for (const [id, entry] of this.registry) {
      if (id === this.currentId) continue

      const rect = entry.element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      let primaryDist: number
      let secondaryOffset: number
      let isCandidate: boolean

      switch (direction) {
        case 'right':
          isCandidate = rect.left >= currentRect.right - EDGE_EPSILON
          primaryDist = rect.left - currentRect.right
          secondaryOffset = Math.abs(centerY - currentCenterY)
          break
        case 'left':
          isCandidate = rect.right <= currentRect.left + EDGE_EPSILON
          primaryDist = currentRect.left - rect.right
          secondaryOffset = Math.abs(centerY - currentCenterY)
          break
        case 'down':
          isCandidate = rect.top >= currentRect.bottom - EDGE_EPSILON
          primaryDist = rect.top - currentRect.bottom
          secondaryOffset = Math.abs(centerX - currentCenterX)
          break
        case 'up':
          isCandidate = rect.bottom <= currentRect.top + EDGE_EPSILON
          primaryDist = currentRect.top - rect.bottom
          secondaryOffset = Math.abs(centerX - currentCenterX)
          break
      }

      if (!isCandidate || primaryDist < 0) continue

      const score = primaryDist + SECONDARY_AXIS_WEIGHT * secondaryOffset
      if (score < bestScore) {
        bestScore = score
        bestId = id
      }
    }

    if (bestId) this.setFocus(bestId)
    return bestId
  }

  reset(): void {
    this.registry.clear()
    this.currentId = null
    this.autoFocusPending = false
    this.onChangeCb?.(null)
  }
}

export const focusManager = new FocusManager()

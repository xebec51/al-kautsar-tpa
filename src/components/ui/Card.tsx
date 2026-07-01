import { useEffect } from 'react'
import { cn } from '@/lib/cn'
import { useFocusable } from '@/navigation/useFocusable'
import { FocusRing } from './FocusRing'

interface CardProps {
  id: string
  onClick?: () => void
  compact?: boolean
  className?: string
  children: React.ReactNode
}

export function Card({ id, onClick, compact = false, className, children }: CardProps) {
  const { ref, isFocused } = useFocusable<HTMLDivElement>(id)

  useEffect(() => {
    if (isFocused) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isFocused, ref])

  return (
    <FocusRing active={isFocused} className="rounded-tv-lg">
      <div
        ref={ref}
        role="button"
        tabIndex={-1}
        onClick={onClick}
        className={cn(
          'bg-overlay border border-border rounded-tv-lg shadow-tv-card h-full',
          compact ? 'p-tv-2' : 'p-tv-6',
          className
        )}
      >
        {children}
      </div>
    </FocusRing>
  )
}

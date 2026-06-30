import { cn } from '@/lib/cn'
import { useFocusable } from '@/navigation/useFocusable'
import { FocusRing } from './FocusRing'

interface CardProps {
  id: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

export function Card({ id, onClick, className, children }: CardProps) {
  const { ref, isFocused } = useFocusable<HTMLDivElement>(id)

  return (
    <FocusRing active={isFocused} className="rounded-tv-lg">
      <div
        ref={ref}
        role="button"
        tabIndex={-1}
        onClick={onClick}
        className={cn(
          'bg-overlay border border-border rounded-tv-lg p-tv-6 shadow-tv-card h-full',
          className
        )}
      >
        {children}
      </div>
    </FocusRing>
  )
}

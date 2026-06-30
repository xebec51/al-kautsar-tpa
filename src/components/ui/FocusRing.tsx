import { cn } from '@/lib/cn'

interface FocusRingProps {
  active?: boolean
  className?: string
  children: React.ReactNode
}

export function FocusRing({ active = false, className, children }: FocusRingProps) {
  return (
    <div
      className={cn(
        'transition-all duration-150',
        active && 'shadow-tv-focus scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  )
}

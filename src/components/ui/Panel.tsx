import { cn } from '@/lib/cn'

interface PanelProps {
  className?: string
  children: React.ReactNode
}

export function Panel({ className, children }: PanelProps) {
  return (
    <div
      className={cn(
        'bg-panel border border-border rounded-tv p-tv-4 shadow-tv-panel',
        className
      )}
    >
      {children}
    </div>
  )
}

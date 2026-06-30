import { cn } from '@/lib/cn'
import { useKeyboard } from '@/navigation/useKeyboard'

interface TVLayoutProps {
  onBack?: () => void
  className?: string
  children: React.ReactNode
}

export function TVLayout({ onBack, className, children }: TVLayoutProps) {
  useKeyboard(onBack)

  return (
    <div
      className={cn(
        'w-screen h-screen overflow-hidden bg-surface text-text-primary flex flex-col',
        className
      )}
    >
      {children}
    </div>
  )
}

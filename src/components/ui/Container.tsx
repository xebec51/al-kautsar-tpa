import { cn } from '@/lib/cn'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-[1760px] mx-auto px-tv-8', className)}>{children}</div>
  )
}

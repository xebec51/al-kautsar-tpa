import { cn } from '@/lib/cn'

interface ArabicTextProps {
  text: string
  className?: string
}

export function ArabicText({ text, className }: ArabicTextProps) {
  return (
    <p
      dir="rtl"
      lang="ar"
      className={cn(
        'font-arabic font-bold text-tv-arabic text-text-primary text-center',
        className
      )}
    >
      {text}
    </p>
  )
}

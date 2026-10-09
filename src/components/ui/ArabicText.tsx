import { cn } from '@/lib/cn'

interface ArabicTextProps {
  text: string
  fontSize: number
  className?: string
}

export function ArabicText({ text, fontSize, className }: ArabicTextProps) {
  return (
    <p
      dir="rtl"
      lang="ar"
      style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
      className={cn(
        'font-arabic font-bold text-text-primary text-center transition-all duration-300 ease-in-out',
        className
      )}
    >
      {text}
    </p>
  )
}

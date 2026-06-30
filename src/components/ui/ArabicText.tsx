import { cn } from '@/lib/cn'
import { useFontSettings } from '@/contexts/useFontSettings'

interface ArabicTextProps {
  text: string
  className?: string
}

export function ArabicText({ text, className }: ArabicTextProps) {
  const { arabicSize } = useFontSettings()

  return (
    <p
      dir="rtl"
      lang="ar"
      style={{ fontSize: `${arabicSize}px`, lineHeight: '1.8' }}
      className={cn(
        'font-arabic font-bold text-text-primary text-center transition-all duration-300 ease-in-out',
        className
      )}
    >
      {text}
    </p>
  )
}

import { cn } from '@/lib/cn'

interface ArabicTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function ArabicText({ text, className, style }: ArabicTextProps) {
  return (
    <p
      dir="rtl"
      lang="ar"
      style={style}
      className={cn('font-arabic font-bold text-text-primary text-center', className)}
    >
      {text}
    </p>
  )
}

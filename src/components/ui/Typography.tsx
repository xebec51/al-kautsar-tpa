import { cn } from '@/lib/cn'
import type { TypographyVariant } from '@/types'

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label'

interface TypographyProps {
  variant?: TypographyVariant
  as?: TypographyElement
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<TypographyVariant, string> = {
  display: 'text-tv-3xl font-bold text-text-primary',
  heading: 'text-tv-2xl font-bold text-text-primary',
  title: 'text-tv-xl font-semibold text-text-primary',
  body: 'text-tv-base font-normal text-text-primary',
  caption: 'text-tv-sm font-normal text-text-secondary',
  label: 'text-tv-xs font-medium text-text-muted uppercase tracking-wider',
}

const defaultElements: Record<TypographyVariant, TypographyElement> = {
  display: 'h1',
  heading: 'h2',
  title: 'h3',
  body: 'p',
  caption: 'p',
  label: 'span',
}

export function Typography({ variant = 'body', as, className, children }: TypographyProps) {
  const Tag = as ?? defaultElements[variant]
  return <Tag className={cn(variantStyles[variant], className)}>{children}</Tag>
}

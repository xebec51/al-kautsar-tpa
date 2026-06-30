import { cn } from '@/lib/cn'
import { useFocusable } from '@/navigation/useFocusable'
import { FocusRing } from './FocusRing'
import type { ButtonVariant } from '@/types'

interface ButtonProps {
  id: string
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-text-inverse hover:bg-accent-hover',
  secondary: 'bg-overlay border border-border text-text-primary',
  ghost: 'bg-transparent text-text-secondary',
}

export function Button({
  id,
  variant = 'primary',
  onClick,
  className,
  children,
}: ButtonProps) {
  const { ref, isFocused } = useFocusable<HTMLButtonElement>(id)

  return (
    <FocusRing active={isFocused} className="rounded-tv">
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'px-tv-8 py-tv-3 rounded-tv text-tv-base font-semibold transition-colors duration-150 cursor-pointer w-full',
          variantStyles[variant],
          className
        )}
      >
        {children}
      </button>
    </FocusRing>
  )
}

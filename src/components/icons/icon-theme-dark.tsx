import { type SVGProps } from 'react'
import { IconThemeSystem } from '@/components/icons/icon-theme-system'
import { cn } from '@/lib/utils'

export function IconThemeDark({
  className,
  style,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <IconThemeSystem
      data-name='icon-theme-dark'
      className={cn(
        'bg-[oklch(0.205_0_0)]',
        className
      )}
      style={{
        fill: 'oklch(0.922 0 0)',
        stroke: 'oklch(0.922 0 0)',
        ...style,
      }}
      {...props}
    />
  )
}


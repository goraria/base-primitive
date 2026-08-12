import { type SVGProps } from 'react'
import { IconThemeSystem } from '@/components/icons/icon-theme-system'
import { cn } from '@/lib/utils'

export function IconThemeLight({
  className,
  style,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <IconThemeSystem
      data-name='icon-theme-light'
      className={cn(
        "bg-[oklch(1_0_0)] [&_[fill='#fff']]:fill-[oklch(1_0_0)] [&_[stroke='#fff']]:stroke-[oklch(1_0_0)]",
        className
      )}
      style={{
        fill: 'oklch(0.205 0 0)',
        stroke: 'oklch(0.205 0 0)',
        ...style,
      }}
      {...props}
    />
  )
}


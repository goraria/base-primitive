import type { SVGProps } from 'react'

export function IconWidthCentered(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name='icon-width-centered'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 79.86 51.14'
      {...props}
    >
      <rect x='2' y='3' width='75.86' height='45.14' rx='4' opacity='.12' />
      <rect x='13' y='8' width='53.86' height='7' rx='2' opacity='.8' />
      <rect x='13' y='19' width='53.86' height='24' rx='2' opacity='.35' />
      <path d='M7 10h3M7 13h3M70 10h3M70 13h3' fill='none' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

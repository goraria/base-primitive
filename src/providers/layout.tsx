"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/lib/cookies'

export type Collapsible = 'offcanvas' | 'icon' | 'none'
export type LayoutVariant = 'inset' | 'sidebar' | 'floating'

export const sidebarCollapsibles: Collapsible[] = [
  'offcanvas',
  'icon',
  'none',
]
export const sidebarVariants: LayoutVariant[] = [
  'sidebar',
  'floating',
  'inset',
]

// Cookie constants following the pattern from sidebar.tsx
const LAYOUT_COLLAPSIBLE_COOKIE_NAME = 'layout_collapsible'
const LAYOUT_VARIANT_COOKIE_NAME = 'layout_variant'
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Default values
const DEFAULT_VARIANT = 'sidebar'
const DEFAULT_COLLAPSIBLE = 'icon'

type LayoutContextType = {
  resetLayout: () => void

  defaultCollapsible: Collapsible
  collapsible: Collapsible
  setCollapsible: (collapsible: Collapsible) => void

  defaultVariant: LayoutVariant
  variant: LayoutVariant
  setVariant: (variant: LayoutVariant) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

function getSavedValue<T extends string>(
  name: string,
  values: readonly T[],
  fallback: T
) {
  const value = getCookie(name)

  return value && values.includes(value as T) ? (value as T) : fallback
}

type LayoutProviderProps = {
  children: React.ReactNode
  initialCollapsible?: Collapsible
  initialVariant?: LayoutVariant
}

export function LayoutProvider({
  children,
  initialCollapsible,
  initialVariant,
}: LayoutProviderProps) {
  const [collapsible, _setCollapsible] = useState<Collapsible>(
    initialCollapsible ?? DEFAULT_COLLAPSIBLE
  )

  const [variant, _setVariant] = useState<LayoutVariant>(
    initialVariant ?? DEFAULT_VARIANT
  )

  useEffect(() => {
    if (!initialCollapsible) {
      _setCollapsible(
        getSavedValue(
          LAYOUT_COLLAPSIBLE_COOKIE_NAME,
          sidebarCollapsibles,
          DEFAULT_COLLAPSIBLE
        )
      )
    }

    if (!initialVariant) {
      _setVariant(
        getSavedValue(
          LAYOUT_VARIANT_COOKIE_NAME,
          sidebarVariants,
          DEFAULT_VARIANT
        )
      )
    }
  }, [initialCollapsible, initialVariant])

  const setCollapsible = (newCollapsible: Collapsible) => {
    const value = sidebarCollapsibles.includes(newCollapsible)
      ? newCollapsible
      : DEFAULT_COLLAPSIBLE

    _setCollapsible(value)
    setCookie(
      LAYOUT_COLLAPSIBLE_COOKIE_NAME,
      value,
      LAYOUT_COOKIE_MAX_AGE
    )
  }

  const setVariant = (newVariant: LayoutVariant) => {
    const value = sidebarVariants.includes(newVariant)
      ? newVariant
      : DEFAULT_VARIANT

    _setVariant(value)
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, value, LAYOUT_COOKIE_MAX_AGE)
  }

  const resetLayout = () => {
    setCollapsible(DEFAULT_COLLAPSIBLE)
    setVariant(DEFAULT_VARIANT)
  }

  const contextValue: LayoutContextType = {
    resetLayout,
    defaultCollapsible: DEFAULT_COLLAPSIBLE,
    collapsible,
    setCollapsible,
    defaultVariant: DEFAULT_VARIANT,
    variant,
    setVariant,
  }

  return <LayoutContext value={contextValue}>{children}</LayoutContext>
}

// Define the hook for the provider
export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

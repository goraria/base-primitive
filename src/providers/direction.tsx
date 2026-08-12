"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { DirectionProvider as BaseDirectionProvider } from '@base-ui/react/direction-provider'
import { setCookie, removeCookie } from '@/lib/cookies'

export type Direction = 'ltr' | 'rtl'

const DEFAULT_DIRECTION = 'ltr'
const DIRECTION_COOKIE_NAME = 'dir'
const DIRECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type DirectionContextType = {
  defaultDir: Direction
  dir: Direction
  setDir: (dir: Direction) => void
  resetDir: () => void
}

const DirectionContext = createContext<DirectionContextType | null>(null)

export function DirectionProvider({
  children,
  initialDirection = DEFAULT_DIRECTION,
}: {
  children: React.ReactNode
  initialDirection?: Direction
}) {
  const [dir, _setDir] = useState<Direction>(initialDirection)

  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute('dir', dir)
  }, [dir])

  const setDir = (dir: Direction) => {
    _setDir(dir)
    setCookie(DIRECTION_COOKIE_NAME, dir, DIRECTION_COOKIE_MAX_AGE)
  }

  const resetDir = () => {
    _setDir(DEFAULT_DIRECTION)
    removeCookie(DIRECTION_COOKIE_NAME)
  }

  return (
    <DirectionContext.Provider
      value={{
        defaultDir: DEFAULT_DIRECTION,
        dir,
        setDir,
        resetDir,
      }}
    >
      <BaseDirectionProvider direction={dir}>{children}</BaseDirectionProvider>
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  const context = useContext(DirectionContext)
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider')
  }
  return context
}


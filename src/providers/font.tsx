"use client"

import { createContext, type PropsWithChildren, useContext, useEffect } from "react"

import { useCookie } from "@/hooks/use-cookie"

export const FONT_OPTIONS = ["inter", "geist", "system"] as const

export type Font = (typeof FONT_OPTIONS)[number]

export const DEFAULT_FONT: Font = "inter"

const FONT_COOKIE_NAME = "color-font"
const FontContext = createContext<{
  defaultFont: Font
  font: Font
  resetFont: () => void
  setFont: (font: Font) => void
} | null>(null)

function isFont(value: string | null): value is Font {
  return FONT_OPTIONS.some((font) => font === value)
}

export function FontProvider({ children }: PropsWithChildren) {
  const fontCookie = useCookie(FONT_COOKIE_NAME, DEFAULT_FONT)
  const font = isFont(fontCookie.value) ? fontCookie.value : DEFAULT_FONT

  useEffect(() => {
    const root = document.documentElement

    FONT_OPTIONS.forEach((option) => root.classList.remove(`font-${option}`))
    root.classList.add(`font-${font}`)
  }, [font])

  return (
    <FontContext.Provider
      value={{
        defaultFont: DEFAULT_FONT,
        font,
        resetFont: fontCookie.resetValue,
        setFont: fontCookie.setValue,
      }}
    >
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  const context = useContext(FontContext)

  if (!context) {
    throw new Error("useFont must be used within FontProvider")
  }

  return context
}

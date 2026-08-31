"use client"

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type SetStateAction,
} from "react"
import type { ThemeProviderProps, UseThemeProps } from "next-themes"

import { useCookie } from "@/hooks/use-cookie"

const THEME_COOKIE_NAME = "color-theme"
const DEFAULT_THEMES = ["light", "dark"]

const ThemeContext = createContext<UseThemeProps | null>(null)
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

function getSystemTheme() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getAllowedTheme(
  value: string | undefined,
  themes: readonly string[],
  enableSystem: boolean,
  fallback: string
) {
  if (enableSystem && value === "system") return value
  return themes.includes(value ?? "") ? value! : fallback
}

function withoutTransitions() {
  const style = document.createElement("style")

  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    window.setTimeout(() => style.remove(), 1)
  }
}

export function ThemeProvider({
  children,
  themes = DEFAULT_THEMES,
  forcedTheme,
  enableSystem = true,
  enableColorScheme = true,
  disableTransitionOnChange = false,
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "class",
  value,
}: ThemeProviderProps) {
  const availableThemes = useMemo(
    () => Array.from(new Set(themes)),
    [themes]
  )
  const fallbackTheme = getAllowedTheme(
    defaultTheme,
    availableThemes,
    enableSystem,
    enableSystem ? "system" : (availableThemes[0] ?? "light")
  )
  const themeCookie = useCookie(THEME_COOKIE_NAME, fallbackTheme)
  const theme = getAllowedTheme(
    themeCookie.value,
    availableThemes,
    enableSystem,
    fallbackTheme
  )
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")
  const activeTheme = getAllowedTheme(
    forcedTheme ?? theme,
    availableThemes,
    enableSystem,
    fallbackTheme
  )
  const resolvedTheme = activeTheme === "system" ? systemTheme : activeTheme

  const applyTheme = useCallback(
    (nextTheme: string) => {
      const root = document.documentElement
      const attributes = Array.isArray(attribute) ? attribute : [attribute]
      const attributeValue = value?.[nextTheme] ?? nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? withoutTransitions()
        : undefined

      for (const name of attributes) {
        if (name === "class") {
          root.classList.remove(
            ...availableThemes.map((item) => value?.[item] ?? item)
          )
          root.classList.add(attributeValue)
        } else {
          root.setAttribute(name, attributeValue)
        }
      }

      if (enableColorScheme) root.style.colorScheme = nextTheme
      restoreTransitions?.()
    },
    [
      attribute,
      availableThemes,
      disableTransitionOnChange,
      enableColorScheme,
      value,
    ]
  )

  useIsomorphicLayoutEffect(() => {
    applyTheme(resolvedTheme)
  }, [applyTheme, resolvedTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? "dark" : "light")

    setSystemTheme(mediaQuery.matches ? "dark" : "light")
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const setTheme = (nextTheme: SetStateAction<string>) => {
    const requestedTheme =
      typeof nextTheme === "function" ? nextTheme(theme) : nextTheme
    const validTheme = getAllowedTheme(
      requestedTheme,
      availableThemes,
      enableSystem,
      fallbackTheme
    )

    const nextResolvedTheme =
      validTheme === "system" ? getSystemTheme() : validTheme

    applyTheme(nextResolvedTheme)
    themeCookie.setValue(validTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        themes: enableSystem
          ? [...availableThemes, "system"]
          : availableThemes,
        forcedTheme,
        setTheme,
        theme: activeTheme,
        resolvedTheme,
        systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

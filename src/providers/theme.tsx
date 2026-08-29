"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type SetStateAction,
} from "react"
import type { ThemeProviderProps, UseThemeProps } from "next-themes"

import { useCookie } from "@/hooks/use-cookie"

const THEME_COOKIE_NAME = "color-theme"
const DEFAULT_THEMES = ["light", "dark"]

const ThemeContext = createContext<UseThemeProps | null>(null)

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

export function ThemeProvider({
  children,
  themes = DEFAULT_THEMES,
  forcedTheme,
  enableSystem = true,
  enableColorScheme = true,
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
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme
  )
  const activeTheme = getAllowedTheme(
    forcedTheme ?? theme,
    availableThemes,
    enableSystem,
    fallbackTheme
  )
  const resolvedTheme = activeTheme === "system" ? systemTheme : activeTheme

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? "dark" : "light")

    setSystemTheme(mediaQuery.matches ? "dark" : "light")
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const attributes = Array.isArray(attribute) ? attribute : [attribute]
    const attributeValue = value?.[resolvedTheme] ?? resolvedTheme

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

    if (enableColorScheme) root.style.colorScheme = resolvedTheme
  }, [attribute, availableThemes, enableColorScheme, resolvedTheme, value])

  const setTheme = (nextTheme: SetStateAction<string>) => {
    const requestedTheme =
      typeof nextTheme === "function" ? nextTheme(theme) : nextTheme
    const validTheme = getAllowedTheme(
      requestedTheme,
      availableThemes,
      enableSystem,
      fallbackTheme
    )

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

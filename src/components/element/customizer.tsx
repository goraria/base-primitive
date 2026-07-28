"use client"

import type { ComponentProps, CSSProperties } from "react"
import { useCallback, useEffect, useState } from "react"
import { Settings2 } from "lucide-react"
import { Badge } from "@/components/custom/badge"
import { Button } from "@/components/custom/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const COLOR_SHEET_WIDTH = "329px"

interface ColorOption {
  key: string
  label: string
  value: string
}

interface CustomizerState {
  base: string
  paint: string
  chart: string
}

const BASE_COLOR_OPTIONS: ColorOption[] = [
  { key: "neutral", label: "Neutral", value: "oklch(0.556 0 0)" },
  { key: "stone", label: "Stone", value: "oklch(0.553 0.013 58.071)" },
  { key: "zinc", label: "Zinc", value: "oklch(0.552 0.016 285.938)" },
  { key: "mauve", label: "Mauve", value: "oklch(0.542 0.034 322.5)" },
  { key: "olive", label: "Olive", value: "oklch(0.58 0.031 107.3)" },
  { key: "mist", label: "Mist", value: "oklch(0.56 0.021 213.5)" },
  { key: "taupe", label: "Taupe", value: "oklch(0.547 0.021 43.1)" },
]

const THEME_COLOR_OPTIONS: ColorOption[] = [
  { key: "neutral", label: "Neutral", value: "#737373" },
  { key: "amber", label: "Amber", value: "#f59e0b" },
  { key: "blue", label: "Blue", value: "#3b82f6" },
  { key: "cyan", label: "Cyan", value: "#06b6d4" },
  { key: "emerald", label: "Emerald", value: "#10b981" },
  { key: "fuchsia", label: "Fuchsia", value: "#d946ef" },
  { key: "green", label: "Green", value: "#22c55e" },
  { key: "indigo", label: "Indigo", value: "#6366f1" },
  { key: "lime", label: "Lime", value: "#84cc16" },
  { key: "orange", label: "Orange", value: "#f97316" },
  { key: "pink", label: "Pink", value: "#ec4899" },
  { key: "purple", label: "Purple", value: "#a855f7" },
  { key: "red", label: "Red", value: "#ef4444" },
  { key: "rose", label: "Rose", value: "#f43f5e" },
  { key: "sky", label: "Sky", value: "#0ea5e9" },
  { key: "teal", label: "Teal", value: "#14b8a6" },
  { key: "violet", label: "Violet", value: "#8b5cf6" },
  { key: "yellow", label: "Yellow", value: "#eab308" },
  //
  { key: "zero", label: "Zero", value: "#EC6683" },
  { key: "first", label: "First", value: "#696cff" },
  { key: "second", label: "Second", value: "#0d9394" },
  { key: "third", label: "Third", value: "#ffab1d" },
  { key: "fourth", label: "Fourth", value: "#eb3d63" },
  { key: "fifth", label: "Fifth", value: "#2092ec" },
]

const CHART_COLOR_OPTIONS: ColorOption[] = [
  { key: "neutral", label: "Neutral", value: "oklch(0.556 0 0)" },
  { key: "amber", label: "Amber", value: "oklch(0.769 0.188 70.08)" },
  { key: "blue", label: "Blue", value: "oklch(0.623 0.214 259.815)" },
  { key: "cyan", label: "Cyan", value: "oklch(0.715 0.143 215.221)" },
  { key: "emerald", label: "Emerald", value: "oklch(0.696 0.17 162.48)" },
  { key: "fuchsia", label: "Fuchsia", value: "oklch(0.667 0.295 322.15)" },
  { key: "green", label: "Green", value: "oklch(0.723 0.219 149.579)" },
  { key: "indigo", label: "Indigo", value: "oklch(0.585 0.233 277.117)" },
  { key: "lime", label: "Lime", value: "oklch(0.768 0.233 130.85)" },
  { key: "orange", label: "Orange", value: "oklch(0.705 0.213 47.604)" },
  { key: "pink", label: "Pink", value: "oklch(0.656 0.241 354.308)" },
  { key: "purple", label: "Purple", value: "oklch(0.627 0.265 303.9)" },
  { key: "red", label: "Red", value: "oklch(0.637 0.237 25.331)" },
  { key: "rose", label: "Rose", value: "oklch(0.645 0.246 16.439)" },
  { key: "sky", label: "Sky", value: "oklch(0.685 0.169 237.323)" },
  { key: "teal", label: "Teal", value: "oklch(0.704 0.14 182.503)" },
  { key: "violet", label: "Violet", value: "oklch(0.606 0.25 292.717)" },
  { key: "yellow", label: "Yellow", value: "oklch(0.795 0.184 86.047)" },
  //
  { key: "zero", label: "Zero", value: "oklch(0.68296 0.16693 9.2103)" },
  { key: "first", label: "First", value: "oklch(0.61021 0.21346 277.129)" },
  { key: "second", label: "Second", value: "oklch(0.60186 0.10057 195.678)" },
  { key: "third", label: "Third", value: "oklch(0.80396 0.1659 72.547)" },
  { key: "fourth", label: "Fourth", value: "oklch(0.62935 0.20911 13.391)" },
  { key: "fifth", label: "Fifth", value: "oklch(0.64487 0.16476 248.642)" },
]

const DEFAULT_CUSTOMIZER_STATE: CustomizerState = {
  base: BASE_COLOR_OPTIONS[0].key,
  paint: THEME_COLOR_OPTIONS[0].key,
  chart: CHART_COLOR_OPTIONS[0].key,
}

const CUSTOMIZER_STORAGE_KEYS: Record<
  keyof CustomizerState,
  keyof CustomizerState
> = {
  base: "base",
  paint: "paint",
  chart: "chart",
}

function applyCustomizerState(state: CustomizerState) {
  const root = document.documentElement
  const base = BASE_COLOR_OPTIONS.find((option) => option.key === state.base)
  const paint = THEME_COLOR_OPTIONS.find((option) => option.key === state.paint)
  const chart = CHART_COLOR_OPTIONS.find((option) => option.key === state.chart)

  root.style.setProperty("--base", getColorVariable(base))
  root.style.setProperty("--paint", getColorVariable(paint))
  root.style.setProperty("--chart", getColorVariable(chart))
}

const CUSTOM_COLOR_VARIABLES: Record<string, string> = {
  zero: "var(--color-professional-main)",
  first: "var(--color-professional-primary-1)",
  second: "var(--color-professional-primary-2)",
  third: "var(--color-professional-primary-3)",
  fourth: "var(--color-professional-primary-4)",
  fifth: "var(--color-professional-primary-5)",
}

function getColorVariable(option?: ColorOption) {
  if (!option) return "var(--color-neutral-500)"

  return CUSTOM_COLOR_VARIABLES[option.key] ?? `var(--color-${option.key}-500)`
}

function getStoredColorKey(
  storageKey: keyof CustomizerState,
  options: ColorOption[],
  fallback: string,
) {
  const storedValue = window.localStorage.getItem(storageKey)
  const storedOption = options.find(
    (option) => option.key === storedValue || option.value === storedValue,
  )

  return storedOption?.key ?? fallback
}

function ColorGroup({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string
  options: ColorOption[]
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <Label>{label}</Label>
      <div className="grid grid-cols-6 gap-3">
        {options.map((option) => (
          <Button
            key={option.key}
            type="button"
            variant="outline"
            size="icon"
            aria-label={`${label}: ${option.label}`}
            aria-pressed={value === option.key}
            title={option.label}
            onClick={() => onValueChange(option.key)}
            className={cn(
              "size-9 cursor-pointer bg-transparent p-0 shadow-none transition-[box-shadow,transform] hover:scale-105 hover:bg-accent hover:shadow-none",
              value === option.key &&
                "ring-3 ring-offset-2 ring-offset-background",
            )}
            style={
              {
                "--tw-ring-color": option.value,
              } as CSSProperties
            }
          >
            <span
              className="size-4 rounded-sm"
              style={{ backgroundColor: option.value }}
            />
          </Button>
        ))}
      </div>
    </div>
  )
}

export function Customizer({
  className,
  ...props
}: ComponentProps<"span">) {
  const [customizer, setCustomizer] = useState<CustomizerState>(
    DEFAULT_CUSTOMIZER_STATE,
  )

  useEffect(() => {
    const storedCustomizer: CustomizerState = {
      base: getStoredColorKey(
        CUSTOMIZER_STORAGE_KEYS.base,
        BASE_COLOR_OPTIONS,
        DEFAULT_CUSTOMIZER_STATE.base,
      ),
      paint: getStoredColorKey(
        CUSTOMIZER_STORAGE_KEYS.paint,
        THEME_COLOR_OPTIONS,
        DEFAULT_CUSTOMIZER_STATE.paint,
      ),
      chart: getStoredColorKey(
        CUSTOMIZER_STORAGE_KEYS.chart,
        CHART_COLOR_OPTIONS,
        DEFAULT_CUSTOMIZER_STATE.chart,
      ),
    }

    window.localStorage.removeItem("customizer_state")
    window.localStorage.removeItem("color")
    Object.entries(storedCustomizer).forEach(([key, value]) => {
      window.localStorage.setItem(key, value)
    })

    setCustomizer(storedCustomizer)
    applyCustomizerState(storedCustomizer)
  }, [])

  const setColor = useCallback(
    (key: keyof CustomizerState, value: string) => {
      setCustomizer((current) => {
        const nextCustomizer = { ...current, [key]: value }

        applyCustomizerState(nextCustomizer)
        window.localStorage.setItem(CUSTOMIZER_STORAGE_KEYS[key], value)

        return nextCustomizer
      })
    },
    [],
  )

  return (
    <span className={className} {...props}>
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="default" className="cursor-pointer" size="icon" />
          }
        >
          <Settings2 />
          <span className="sr-only">Quick Setting</span>
        </SheetTrigger>
        <SheetContent
          className="w-auto"
          style={{
            width: COLOR_SHEET_WIDTH,
            maxWidth: COLOR_SHEET_WIDTH,
          }}
        >
          <SheetHeader className="pb-0">
            <SheetTitle>Theme Customizer</SheetTitle>
            <SheetDescription>Customize & Preview in Real Time</SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex flex-col gap-1.5 p-4 pb-0">
            <Badge variant="secondary" className="rounded">
              Theming
            </Badge>
          </div>
          <ColorGroup
            label="Base Color"
            options={BASE_COLOR_OPTIONS}
            value={customizer.base}
            onValueChange={(value) => setColor("base", value)}
          />
          <ColorGroup
            label="Theme Color"
            options={THEME_COLOR_OPTIONS}
            value={customizer.paint}
            onValueChange={(value) => setColor("paint", value)}
          />
          <ColorGroup
            label="Chart Color"
            options={CHART_COLOR_OPTIONS}
            value={customizer.chart}
            onValueChange={(value) => setColor("chart", value)}
          />
        </SheetContent>
      </Sheet>
    </span>
  )
}

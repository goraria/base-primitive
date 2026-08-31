"use client"

import { useCallback, useEffect, useState } from "react"

import { getCookie, removeCookie, setCookie } from "@/lib/cookies"

const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export interface UseCookieOptions {
  maxAge?: number
}

export function useCookie(
  name: string,
  defaultValue: string,
  { maxAge = DEFAULT_COOKIE_MAX_AGE }: UseCookieOptions = {}
) {
  const [value, setValueState] = useState(defaultValue)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setValueState(getCookie(name) ?? defaultValue)
    setReady(true)
  }, [defaultValue, name])

  const setValue = useCallback(
    (nextValue: string) => {
      setCookie(name, nextValue, maxAge)
      setValueState(nextValue)
    },
    [maxAge, name]
  )

  const resetValue = useCallback(() => {
    removeCookie(name)
    setValueState(defaultValue)
  }, [defaultValue, name])

  return { value, ready, setValue, resetValue }
}

import * as React from "react"

interface UseControllableStateProps<T> {
  prop?: T
  defaultProp: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolledValue

  const setValue = React.useCallback(
    (nextValue: React.SetStateAction<T>) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (currentValue: T) => T)(value)
          : nextValue

      if (!isControlled) {
        setUncontrolledValue(resolvedValue)
      }

      if (!Object.is(value, resolvedValue)) {
        onChange?.(resolvedValue)
      }
    },
    [isControlled, onChange, value]
  )

  return [value, setValue] as const
}

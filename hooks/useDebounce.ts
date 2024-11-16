import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

/**
 * Use debounce state hook
 * @param {any} value
 * @param {number} [delay = 300] default 300
 */
export function useDebounceState<T = unknown>(value: T, delay?: number): [T, Dispatch<SetStateAction<T>>]
export function useDebounceState<T = undefined>(
  value?: undefined,
  delay?: number
): [T | undefined, Dispatch<SetStateAction<T>>]
export function useDebounceState<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const setDebounce = useCallback(
    (newState: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(
        () =>
          setDebouncedValue(prevState => {
            if (typeof newState === 'function') newState = newState(prevState)
            return newState
          }),
        delay
      )
    },
    [delay]
  )

  return [debouncedValue, setDebounce as Dispatch<SetStateAction<T>>] as const
}

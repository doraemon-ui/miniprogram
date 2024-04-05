import { type DebounceOptions, type DebounceReturn, debounce } from './debounce'
import { isPlainObject } from './isPlainObject'

export type ThrottleOptions = Omit<DebounceOptions, 'maxWait'>
export type ThrottleReturn<T extends (...args: any[]) => any> = DebounceReturn<T>

let FUNC_ERROR_TEXT = 'Expected a function'

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: ThrottleOptions
): ThrottleReturn<T> {
  let leading = true,
    trailing = true

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing,
  })
}

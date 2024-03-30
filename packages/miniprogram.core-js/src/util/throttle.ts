import { debounce } from './debounce'
import { isPlainObject } from './isPlainObject'

let FUNC_ERROR_TEXT = 'Expected a function'

export function throttle(func: Function, wait?: number, options?: { leading: boolean, trailing: boolean }) {
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

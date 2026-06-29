import { isPresetColor } from '../util'

/**
 * Generate preset color class names.
 *
 * Priority:
 * 1. Return preset color classes when `color` matches a built-in semantic token
 * 2. Return `null` for custom colors or empty values so callers can handle inline styles separately
 *
 * Example:
 * ```ts
 * useColorCls('positive')
 * // => { 'dora-color': true, 'dora-color--positive': true }
 *
 * useColorCls('#1677ff')
 * // => null
 * ```
 *
 * @param color Semantic preset color name
 * @returns Preset color class map or `null` when no preset color matches
 */
export function useColorCls(color?: string): Record<string, boolean> | null {
  if (!isPresetColor(color)) {
    return null
  }
  return {
    ['dora-color']: !!color,
    [`dora-color--${color}`]: !!color,
  }
}

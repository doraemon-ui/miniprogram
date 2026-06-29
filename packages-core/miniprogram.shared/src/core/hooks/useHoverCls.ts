/**
 * Generate hover class name.
 *
 * Priority:
 * 1. Use external `hoverClass` when provided and not equal to `default`
 * 2. Fallback to internal BEM modifier class
 *
 * Example:
 * ```ts
 * useHoverCls('dora-button', '')
 * // => 'dora-button--hover'
 *
 * useHoverCls('dora-button', 'custom-hover')
 * // => 'custom-hover'
 *
 * useHoverCls('dora-button', '', 'active')
 * // => 'dora-button--active'
 * ```
 *
 * @param prefixCls Component prefix class name
 * @param hoverClass Custom hover class name
 * @param modifier BEM modifier name for hover state
 * @returns Resolved hover class name
 */
export function useHoverCls(prefixCls: string, hoverClass: string, modifier: string = 'hover') {
  return hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--${modifier}`
}

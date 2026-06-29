/**
 * Generate CSS variable root class name.
 *
 * Priority:
 * 1. Always append the shared `--css-var` suffix to the component prefix class
 * 2. Keep the output stable so components can opt into CSS variable styles consistently
 *
 * Example:
 * ```ts
 * useCSSVarCls('dora-button')
 * // => 'dora-button--css-var'
 * ```
 *
 * @param prefixCls Component prefix class name
 * @returns Root class name used for CSS variable styles
 */
export function useCSSVarCls(prefixCls: string) {
  return `${prefixCls}--css-var`
}

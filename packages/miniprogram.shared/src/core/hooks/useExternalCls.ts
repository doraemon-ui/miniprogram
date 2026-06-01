/**
 * Generate external class names for semantic slots.
 *
 * Priority:
 * 1. Prefix each semantic name with the shared `dora-` namespace
 * 2. Suffix each generated class with `-class` to match miniprogram externalClasses conventions
 *
 * Example:
 * ```ts
 * useExternalCls(['root', 'hover'])
 * // => ['dora-root-class', 'dora-hover-class']
 * ```
 *
 * @param semanticName Semantic slot names
 * @returns External class names in the same order as the input names
 */
export const useExternalCls = <const T extends string[]>(semanticName: T) => {
  return semanticName.map((name) => `dora-${name}-class`) as {
    [K in keyof T]: `dora-${T[K]}-class`
  }
}

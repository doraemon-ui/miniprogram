/**
 * This hook is only for cssVar to add root className for components.
 * If root ClassName is needed, this hook could be refactored with `--root`
 * @param prefixCls
 */
export const useCSSVarCls = (prefixCls: string) => `${prefixCls}--css-var`

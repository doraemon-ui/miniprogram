/**
 * Simple bind
 */
export function bind(fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

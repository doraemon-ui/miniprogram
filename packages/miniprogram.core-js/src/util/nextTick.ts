import { inMiniprogram, miniprogramThis } from './env'

export function nextTick (fn: (...args: any[]) => any): void {
  if (
    inMiniprogram &&
    typeof miniprogramThis.nextTick === 'function'
  ) {
    miniprogramThis.nextTick(fn)
  } else {
    setTimeout(fn, 0)
  }
}

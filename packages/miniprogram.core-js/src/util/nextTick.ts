import { inMiniprogram } from './env'

export function nextTick (fn: (...args: any[]) => any): void {
  if (
    inMiniprogram &&
    typeof wx.nextTick === 'function'
  ) {
    wx.nextTick(fn)
  } else {
    setTimeout(fn, 0)
  }
}

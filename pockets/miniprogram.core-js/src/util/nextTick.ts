import { inMiniprogram } from './env'

export function nextTick (callback: (...args: any[]) => any): void {
  if (
    inMiniprogram &&
    typeof wx.nextTick === 'function'
  ) {
    wx.nextTick(callback)
  } else {
    setTimeout(callback, 0)
  }
}

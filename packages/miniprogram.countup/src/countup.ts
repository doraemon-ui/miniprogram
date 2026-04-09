import type {
  CountUpEasingFn,
  CountUpFormattingFn,
  CountUpOptions,
  CountUpPageLike,
  CountUpPrintValue,
  CountUpSetData,
  ResolvedCountUpOptions,
} from './types'

/**
 * 计数器工具类（来自 `wux-weapp/src/countup`）
 *
 * - 通过 `new CountUp(startVal, endVal, decimals, duration, options, page)` 创建实例
 * - 在 `printValue` 回调中使用 `this.setData` 更新页面数据
 */
export default class CountUp {
  page: CountUpPageLike
  options: ResolvedCountUpOptions
  setData!: CountUpSetData

  startVal: number
  cacheVal: number = 0
  endVal: number
  decimals: number
  duration: number

  countDown: boolean = false
  frameVal: number = 0
  dec: number = 1

  lastTime: number = 0
  startTime?: number
  timestamp?: number
  remaining: number = 0
  paused: boolean = false

  rAF: ReturnType<typeof setTimeout> | null = null
  callback?: () => void

  easingFn: CountUpEasingFn = (t, b, c, d) => this.easeOutExpo(t, b, c, d)
  formattingFn: CountUpFormattingFn = (value) => this.formatNumber(value)
  printValue: CountUpPrintValue = () => {}

  constructor(
    startVal: number,
    endVal: number,
    decimals: number,
    duration: number,
    options: CountUpOptions = {},
    page: CountUpPageLike = getCurrentPages()[getCurrentPages().length - 1] as unknown as CountUpPageLike,
  ) {
    this.page = page
    this.startVal = startVal
    this.endVal = endVal
    this.decimals = decimals
    this.duration = duration
    this.options = this.setDefaultOptions()

    this.__init(options)
  }

  /**
   * 初始化
   */
  __init(options: CountUpOptions = {}) {
    this.setData = this.page.setData.bind(this.page)
    this.lastTime = 0

    this.mergeOptions(options)

    this.startVal = Number(this.startVal)
    this.cacheVal = this.startVal
    this.endVal = Number(this.endVal)
    this.countDown = this.startVal > this.endVal
    this.frameVal = this.startVal
    this.decimals = Math.max(0, this.decimals || 0)
    this.dec = Math.pow(10, this.decimals)
    this.duration = Number(this.duration) * 1000 || 2000

    // format startVal on initialization
    this.printValue(this.formattingFn(this.startVal))
  }

  /**
   * 默认参数
   */
  setDefaultOptions(): ResolvedCountUpOptions {
    return {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      easingFn: null,
      formattingFn: null,
      printValue: () => {},
      prefix: '',
      suffix: '',
    }
  }

  /**
   * 合并参数
   */
  mergeOptions(options: CountUpOptions) {
    const defaultOptions = this.setDefaultOptions()

    const merged: ResolvedCountUpOptions = {
      useEasing: options.useEasing !== undefined ? options.useEasing : defaultOptions.useEasing,
      useGrouping: options.useGrouping !== undefined ? options.useGrouping : defaultOptions.useGrouping,
      separator: options.separator !== undefined ? options.separator : defaultOptions.separator,
      decimal: options.decimal !== undefined ? options.decimal : defaultOptions.decimal,
      easingFn: options.easingFn !== undefined ? options.easingFn : defaultOptions.easingFn,
      formattingFn: options.formattingFn !== undefined ? options.formattingFn : defaultOptions.formattingFn,
      printValue: options.printValue !== undefined && options.printValue !== null ? options.printValue : defaultOptions.printValue,
      prefix: options.prefix !== undefined ? options.prefix : defaultOptions.prefix,
      suffix: options.suffix !== undefined ? options.suffix : defaultOptions.suffix,
    }

    if (typeof merged.easingFn === 'function') merged.easingFn = merged.easingFn.bind(this)
    if (typeof merged.formattingFn === 'function') merged.formattingFn = merged.formattingFn.bind(this)
    if (typeof merged.printValue === 'function') merged.printValue = merged.printValue.bind(this)

    if (merged.separator === '') merged.useGrouping = false
    if (!merged.prefix) merged.prefix = ''
    if (!merged.suffix) merged.suffix = ''

    this.options = merged
    this.easingFn = merged.easingFn ? merged.easingFn : this.easeOutExpo
    this.formattingFn = merged.formattingFn ? merged.formattingFn : this.formatNumber
    this.printValue = merged.printValue ? merged.printValue : () => {}
  }

  /**
   * 创建定时器
   */
  requestAnimationFrame(callback: (timestamp: number) => void) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
    const timeout = setTimeout(() => {
      callback.bind(this)(currTime + timeToCall)
    }, timeToCall)
    this.lastTime = currTime + timeToCall
    return timeout
  }

  /**
   * 清空定时器
   */
  cancelAnimationFrame(timeout: ReturnType<typeof setTimeout> | null) {
    if (timeout) clearTimeout(timeout)
  }

  /**
   * 格式化数字
   */
  formatNumber(nStr: number) {
    const fixed = nStr.toFixed(this.decimals)
    const x = fixed.split('.')
    let x1 = x[0] || ''
    const x2 = x.length > 1 ? this.options.decimal + x[1] : ''
    const rgx = /(\d+)(\d{3})/
    if (this.options.useGrouping) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + this.options.separator + '$2')
      }
    }
    return this.options.prefix + x1 + x2 + this.options.suffix
  }

  /**
   * 过渡效果
   */
  easeOutExpo(t: number, b: number, c: number, d: number) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
  }

  /**
   * 计数函数
   */
  count = (timestamp: number) => {
    if (this.startTime === undefined) {
      this.startTime = timestamp
    }

    this.timestamp = timestamp
    const progress = timestamp - this.startTime
    this.remaining = this.duration - progress

    // to ease or not to ease
    if (this.options.useEasing) {
      if (this.countDown) {
        this.frameVal = this.startVal - this.easingFn(progress, 0, this.startVal - this.endVal, this.duration)
      } else {
        this.frameVal = this.easingFn(progress, this.startVal, this.endVal - this.startVal, this.duration)
      }
    } else {
      if (this.countDown) {
        this.frameVal = this.startVal - (this.startVal - this.endVal) * (progress / this.duration)
      } else {
        this.frameVal = this.startVal + (this.endVal - this.startVal) * (progress / this.duration)
      }
    }

    // don't go past endVal since progress can exceed duration in the last frame
    if (this.countDown) {
      this.frameVal = this.frameVal < this.endVal ? this.endVal : this.frameVal
    } else {
      this.frameVal = this.frameVal > this.endVal ? this.endVal : this.frameVal
    }

    // decimal
    this.frameVal = Math.round(this.frameVal * this.dec) / this.dec

    // format and print value
    this.printValue(this.formattingFn(this.frameVal))

    // whether to continue
    if (progress < this.duration) {
      this.rAF = this.requestAnimationFrame(this.count)
    } else {
      if (this.callback) this.callback()
    }
  }

  /**
   * 启动计数器
   */
  start(callback?: () => void) {
    this.callback = callback
    this.rAF = this.requestAnimationFrame(this.count)
    return false
  }

  /**
   * 停止/继续计数器
   */
  pauseResume() {
    if (!this.paused) {
      this.paused = true
      this.cancelAnimationFrame(this.rAF)
    } else {
      this.paused = false
      this.startTime = undefined
      this.duration = this.remaining
      this.startVal = this.frameVal
      this.requestAnimationFrame(this.count)
    }
  }

  /**
   * 重置计数器
   */
  reset() {
    this.paused = false
    this.startTime = undefined
    this.startVal = this.cacheVal
    this.cancelAnimationFrame(this.rAF)
    this.printValue(this.formattingFn(this.startVal))
  }

  /**
   * 更新计数器
   */
  update(newEndVal: number) {
    this.cancelAnimationFrame(this.rAF)
    this.paused = false
    this.startTime = undefined
    this.startVal = this.frameVal
    this.endVal = Number(newEndVal)
    this.countDown = this.startVal > this.endVal
    this.rAF = this.requestAnimationFrame(this.count)
  }
}

import type { CountdownDateInput, CountdownDiffDate, CountdownOptions, CountdownPageLike, CountdownSetData } from './types'

/**
 * 倒计时工具类（来自 `wux-weapp/src/countdown`）
 *
 * - 通过 `new Countdown(options, page)` 创建实例
 * - 在 `render` 回调中使用 `this.setData` 更新页面数据
 */
export default class Countdown {
  /**
   * 页面实例（用于 setData）
   */
  page: CountdownPageLike

  /**
   * 配置项
   */
  options: CountdownOptions

  /**
   * setData 方法（绑定到 page.setData）
   */
  setData!: CountdownSetData

  /**
   * 定时器句柄
   */
  interval: ReturnType<typeof setInterval> | null = null

  constructor(
    options: Partial<CountdownOptions> = {},
    page: CountdownPageLike = getCurrentPages()[getCurrentPages().length - 1] as unknown as CountdownPageLike,
  ) {
    this.page = page
    this.options = this.setDefaults()
    this.__init(options)
  }

  /**
   * 初始化
   */
  __init(options: Partial<CountdownOptions> = {}) {
    this.setData = this.page.setData.bind(this.page)
    this.restart(options)
  }

  /**
   * 默认参数
   */
  setDefaults(): CountdownOptions {
    return {
      date: 'June 7, 2087 15:03:25',
      refresh: 1000,
      offset: 0,
      onEnd() {},
      render() {},
    }
  }

  /**
   * 合并参数
   */
  mergeOptions(options: Partial<CountdownOptions>) {
    const defaultOptions = this.setDefaults()

    const merged: CountdownOptions = {
      date: options.date !== undefined ? options.date : defaultOptions.date,
      refresh: options.refresh !== undefined ? options.refresh : defaultOptions.refresh,
      offset: options.offset !== undefined ? options.offset : defaultOptions.offset,
      onEnd: options.onEnd !== undefined ? options.onEnd : defaultOptions.onEnd,
      render: options.render !== undefined ? options.render : defaultOptions.render,
    }

    merged.date = merged.date instanceof Date ? merged.date : new Date(merged.date)
    merged.onEnd = typeof merged.onEnd === 'function' ? merged.onEnd.bind(this) : defaultOptions.onEnd.bind(this)
    merged.render = typeof merged.render === 'function' ? merged.render.bind(this) : defaultOptions.render.bind(this)

    this.options = merged
  }

  /**
   * 计算日期差
   */
  getDiffDate(): CountdownDiffDate {
    let diff = ((this.options.date as Date).getTime() - Date.now() + this.options.offset) / 1000

    const dateData: CountdownDiffDate = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    }

    if (diff <= 0) {
      if (this.interval) {
        this.stop()
        this.options.onEnd()
      }
      return dateData
    }

    if (diff >= 365.25 * 86400) {
      dateData.years = Math.floor(diff / (365.25 * 86400))
      diff -= dateData.years * 365.25 * 86400
    }

    if (diff >= 86400) {
      dateData.days = Math.floor(diff / 86400)
      diff -= dateData.days * 86400
    }

    if (diff >= 3600) {
      dateData.hours = Math.floor(diff / 3600)
      diff -= dateData.hours * 3600
    }

    if (diff >= 60) {
      dateData.min = Math.floor(diff / 60)
      diff -= dateData.min * 60
    }

    dateData.sec = Math.round(diff)
    dateData.millisec = (diff % 1) * 1000

    return dateData
  }

  /**
   * 补零
   */
  leadingZeros(num: number | string, length: number = 2) {
    const raw = String(num)
    if (raw.length > length) return raw
    return (Array(length + 1).join('0') + raw).substr(-length)
  }

  /**
   * 更新组件
   */
  update(newDate: CountdownDateInput) {
    this.options.date = typeof newDate !== 'object' ? new Date(newDate) : newDate
    this.render()
    return this
  }

  /**
   * 停止倒计时
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    return this
  }

  /**
   * 渲染组件
   */
  render() {
    this.options.render(this.getDiffDate())
    return this
  }

  /**
   * 启动倒计时
   */
  start() {
    if (this.interval) return false
    this.render()
    if (this.options.refresh) {
      this.interval = setInterval(() => {
        this.render()
      }, this.options.refresh)
    }
    return this
  }

  /**
   * 更新 offset
   */
  updateOffset(offset: number) {
    this.options.offset = offset
    return this
  }

  /**
   * 重启倒计时
   */
  restart(options: Partial<CountdownOptions> = {}) {
    this.mergeOptions(options)
    this.interval = null
    this.start()
    return this
  }
}

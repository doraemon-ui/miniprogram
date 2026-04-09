/**
 * CountdownDateInput类型定义
 */
export type CountdownDateInput = string | number | Date

/**
 * CountdownDiffDate接口定义
 */
export interface CountdownDiffDate {
  /**
   * years
   * @type {number}
   */
  years: number

  /**
   * days
   * @type {number}
   */
  days: number

  /**
   * hours
   * @type {number}
   */
  hours: number

  /**
   * min
   * @type {number}
   */
  min: number

  /**
   * sec
   * @type {number}
   */
  sec: number

  /**
   * millisec
   * @type {number}
   */
  millisec: number
}

/**
 * CountdownSetData类型定义
 */
export type CountdownSetData = (data: Record<string, unknown>, callback?: () => void) => void

/**
 * CountdownPageLike接口定义
 */
export interface CountdownPageLike {
  /**
   * setData
   * @type {CountdownSetData}
   */
  setData: CountdownSetData
}

/**
 * CountdownOptions接口定义
 */
export interface CountdownOptions {
  /**
   * 目标时间
   */
  date: CountdownDateInput

  /**
   * 刷新频率（ms），为 0 时不会启动定时器
   */
  refresh: number

  /**
   * 时间偏移量（ms）
   */
  offset: number

  /**
   * 倒计时结束时触发
   */
  onEnd: () => void

  /**
   * 每次渲染时触发
   */
  render: (date: CountdownDiffDate) => void
}
import type Countdown from './countdown'

/**
 * CountdownInstance类型定义
 */
export type CountdownInstance = InstanceType<typeof Countdown>

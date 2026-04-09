/**
 * CountUpSetData类型定义
 */
export type CountUpSetData = (data: Record<string, unknown>, callback?: () => void) => void

/**
 * CountUpPageLike接口定义
 */
export interface CountUpPageLike {
  /**
   * setData
   * @type {CountUpSetData}
   */
  setData: CountUpSetData
}

/**
 * CountUpEasingFn类型定义
 */
export type CountUpEasingFn = (t: number, b: number, c: number, d: number) => number
/**
 * CountUpFormattingFn类型定义
 */
export type CountUpFormattingFn = (value: number) => string
/**
 * CountUpPrintValue类型定义
 */
export type CountUpPrintValue = (value: string) => void

/**
 * CountUpOptions接口定义
 */
export interface CountUpOptions {
  /**
   * useEasing
   * @type {boolean}
   */
  useEasing?: boolean

  /**
   * useGrouping
   * @type {boolean}
   */
  useGrouping?: boolean

  /**
   * separator
   * @type {string}
   */
  separator?: string

  /**
   * decimal
   * @type {string}
   */
  decimal?: string

  /**
   * easingFn
   * @type {CountUpEasingFn | null}
   */
  easingFn?: CountUpEasingFn | null

  /**
   * formattingFn
   * @type {CountUpFormattingFn | null}
   */
  formattingFn?: CountUpFormattingFn | null

  /**
   * printValue
   * @type {CountUpPrintValue | null}
   */
  printValue?: CountUpPrintValue | null

  /**
   * prefix
   * @type {string}
   */
  prefix?: string

  /**
   * suffix
   * @type {string}
   */
  suffix?: string
}

/**
 * ResolvedCountUpOptions接口定义
 */
export interface ResolvedCountUpOptions {
  /**
   * useEasing
   * @type {boolean}
   */
  useEasing: boolean

  /**
   * useGrouping
   * @type {boolean}
   */
  useGrouping: boolean

  /**
   * separator
   * @type {string}
   */
  separator: string

  /**
   * decimal
   * @type {string}
   */
  decimal: string

  /**
   * easingFn
   * @type {CountUpEasingFn | null}
   */
  easingFn: CountUpEasingFn | null

  /**
   * formattingFn
   * @type {CountUpFormattingFn | null}
   */
  formattingFn: CountUpFormattingFn | null

  /**
   * printValue
   * @type {CountUpPrintValue}
   */
  printValue: CountUpPrintValue

  /**
   * prefix
   * @type {string}
   */
  prefix: string

  /**
   * suffix
   * @type {string}
   */
  suffix: string
}
import type CountUp from './countup'

/**
 * CountUpInstance类型定义
 */
export type CountUpInstance = InstanceType<typeof CountUp>

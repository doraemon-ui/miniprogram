import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Slider } from './index'

/**
 * SliderShowValue类型定义
 */
export type SliderShowValue = boolean | { min?: boolean; max?: boolean }

/**
 * SliderValueDetail接口定义
 */
export interface SliderValueDetail {
  /**
   * offsets
   * @type {number[]}
   */
  offsets: number[]

  /**
   * value
   * @type {number[]}
   */
  value: number[]
}

/**
 * SliderProps接口定义
 */
export interface SliderProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 最小值
   *
   * @type {number}
   */
  min?: number

  /**
   * 最大值
   *
   * @type {number}
   */
  max?: number

  /**
   * 步长
   *
   * @type {number}
   */
  step?: number

  /**
   * 默认值
   *
   * @type {number[]}
   */
  defaultValue?: number[]

  /**
   * 当前值
   *
   * @type {number[]}
   */
  value?: number[]

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否显示刻度
   *
   * @type {boolean}
   */
  showMark?: boolean

  /**
   * 是否显示数值
   *
   * @type {SliderShowValue}
   */
  showValue?: SliderShowValue

  /**
   * 提示格式
   *
   * @type {string}
   */
  tipFormatter?: string

  /**
   * 刻度样式
   *
   * @type {unknown}
   */
  markStyle?: unknown

  /**
   * 手柄样式
   *
   * @type {unknown}
   */
  handleStyle?: unknown

  /**
   * 轨道样式
   *
   * @type {unknown}
   */
  trackStyle?: unknown

  /**
   * 底轨样式
   *
   * @type {unknown}
   */
  railStyle?: unknown

  /**
   * 外层样式
   *
   * @type {unknown}
   */
  wrapStyle?: unknown
}

/**
 * SliderExpose接口定义
 */
export interface SliderExpose {}

/**
 * SliderInstance类型定义
 */
export type SliderInstance = ComponentPublicInstance<Slider, SliderProps, SliderExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { InputNumber } from './index'

/**
 * InputNumberShape类型定义
 */
export type InputNumberShape = 'square' | 'round'
/**
 * InputNumberColor类型定义
 */
export type InputNumberColor = 'positive' | 'balanced' | 'assertive' | 'dark' | 'gray'

/**
 * InputNumberChangeDetail接口定义
 */
export interface InputNumberChangeDetail {
  /**
   * value
   * @type {number | string}
   */
  value: number | string
}

/**
 * InputNumberProps接口定义
 */
export interface InputNumberProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 外观形状
   *
   * @type {InputNumberShape}
   */
  shape?: InputNumberShape

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
   * 步进值
   *
   * @type {number}
   */
  step?: number

  /**
   * 默认值（非受控）
   *
   * @type {number}
   */
  defaultValue?: number

  /**
   * 当前值（受控）
   *
   * @type {number}
   */
  value?: number

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   */
  readOnly?: boolean

  /**
   * 是否支持长按连续触发
   *
   * @type {boolean}
   */
  longpress?: boolean

  /**
   * 主题色
   *
   * @type {InputNumberColor}
   */
  color?: InputNumberColor

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 小数位数，-1 表示不限制
   *
   * @type {number}
   */
  digits?: number
}

/**
 * InputNumberExpose接口定义
 */
export interface InputNumberExpose {}

/**
 * InputNumberInstance类型定义
 */
export type InputNumberInstance = ComponentPublicInstance<InputNumber, InputNumberProps, InputNumberExpose>

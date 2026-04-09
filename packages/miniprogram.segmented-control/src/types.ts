import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { SegmentedControl } from './index'

/**
 * SegmentedControlChangeDetail接口定义
 */
export interface SegmentedControlChangeDetail {
  /**
   * key
   * @type {number}
   */
  key: number

  /**
   * values
   * @type {string[]}
   */
  values: string[]
}

/**
 * SegmentedControlProps接口定义
 */
export interface SegmentedControlProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 主题
   *
   * @type {string}
   */
  theme?: string

  /**
   * 默认选中项
   *
   * @type {number}
   */
  defaultCurrent?: number

  /**
   * 当前选中项
   *
   * @type {number}
   */
  current?: number

  /**
   * 选项列表
   *
   * @type {string[]}
   */
  values?: string[]

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean
}

/**
 * SegmentedControlExpose接口定义
 */
export interface SegmentedControlExpose {}

/**
 * SegmentedControlInstance类型定义
 */
export type SegmentedControlInstance = ComponentPublicInstance<SegmentedControl, SegmentedControlProps, SegmentedControlExpose>

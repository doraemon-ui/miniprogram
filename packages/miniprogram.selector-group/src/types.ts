import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { SelectorGroup } from './index'

/**
 * SelectorFieldNames接口定义
 */
export interface SelectorFieldNames {
  /**
   * label
   * @type {string}
   */
  label?: string

  /**
   * value
   * @type {string}
   */
  value?: string

  /**
   * disabled
   * @type {string}
   */
  disabled?: string
}

/**
 * SelectorOptionView接口定义
 */
export interface SelectorOptionView {
  /**
   * label
   * @type {string}
   */
  label: string

  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * disabled
   * @type {boolean}
   */
  disabled: boolean

  /**
   * desc
   * @type {string}
   */
  desc: string

  /**
   * checked
   * @type {boolean}
   */
  checked: boolean
}

/**
 * SelectorGroupValueDetail接口定义
 */
export interface SelectorGroupValueDetail {
  /**
   * value
   * @type {string[]}
   */
  value: string[]

  /**
   * displayValue
   * @type {string[]}
   */
  displayValue: string[]

  /**
   * selectedIndex
   * @type {number[]}
   */
  selectedIndex: number[]

  /**
   * selectedValue
   * @type {string[]}
   */
  selectedValue: string[]

  /**
   * cols
   * @type {SelectorOptionView[]}
   */
  cols: SelectorOptionView[]
}

/**
 * SelectorGroupProps接口定义
 */
export interface SelectorGroupProps {
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
   * 形状
   *
   * @type {string}
   */
  shape?: string

  /**
   * 列数
   *
   * @type {number}
   */
  columns?: number

  /**
   * 间距
   *
   * @type {number}
   */
  gap?: number

  /**
   * 选项列表
   *
   * @type {(string | Record<string, unknown>)[]}
   */
  options?: (string | Record<string, unknown>)[]

  /**
   * 默认值
   *
   * @type {string[]}
   */
  defaultValue?: string[]

  /**
   * 当前值
   *
   * @type {string[]}
   */
  value?: string[]

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 是否多选
   *
   * @type {boolean}
   */
  multiple?: boolean

  /**
   * 是否展示勾选图标
   *
   * @type {boolean}
   */
  showCheckMark?: boolean

  /**
   * 字段映射
   *
   * @type {SelectorFieldNames}
   */
  defaultFieldNames?: SelectorFieldNames
}

/**
 * SelectorGroupExpose接口定义
 */
export interface SelectorGroupExpose {}

/**
 * SelectorGroupInstance类型定义
 */
export type SelectorGroupInstance = ComponentPublicInstance<SelectorGroup, SelectorGroupProps, SelectorGroupExpose>

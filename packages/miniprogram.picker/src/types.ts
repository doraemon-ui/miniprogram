import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Picker } from './index'

/**
 * PickerValueDetail接口定义
 */
export interface PickerValueDetail {
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
   * @type {unknown[]}
   */
  cols: unknown[]
}

/**
 * PickerToolbar接口定义
 */
export interface PickerToolbar {
  /**
   * title
   * @type {string}
   */
  title?: string

  /**
   * cancelText
   * @type {string}
   */
  cancelText?: string

  /**
   * confirmText
   * @type {string}
   */
  confirmText?: string
}

/**
 * PickerFieldNames接口定义
 */
export interface PickerFieldNames {
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

  /**
   * children
   * @type {string}
   */
  children?: string
}

/**
 * PickerProps接口定义
 */
export interface PickerProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * multiPickerPrefixCls
   * @type {string}
   */
  multiPickerPrefixCls?: string

  /**
   * pickerPrefixCls
   * @type {string}
   */
  pickerPrefixCls?: string

  /**
   * toolbar
   * @type {PickerToolbar}
   */
  toolbar?: PickerToolbar

  /**
   * defaultVisible
   * @type {boolean}
   */
  defaultVisible?: boolean

  /**
   * visible
   * @type {boolean}
   */
  visible?: boolean

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * cascade
   * @type {boolean}
   */
  cascade?: boolean

  /**
   * cols
   * @type {number}
   */
  cols?: number

  /**
   * value
   * @type {string[]}
   */
  value?: string[]

  /**
   * options
   * @type {unknown[]}
   */
  options?: unknown[]

  /**
   * loading
   * @type {boolean}
   */
  loading?: boolean

  /**
   * itemHeight
   * @type {number}
   */
  itemHeight?: number

  /**
   * itemStyle
   * @type {unknown}
   */
  itemStyle?: unknown

  /**
   * indicatorStyle
   * @type {unknown}
   */
  indicatorStyle?: unknown

  /**
   * indicatorClass
   * @type {string}
   */
  indicatorClass?: string

  /**
   * maskStyle
   * @type {unknown}
   */
  maskStyle?: unknown

  /**
   * maskClass
   * @type {string}
   */
  maskClass?: string

  /**
   * labelAlign
   * @type {string}
   */
  labelAlign?: string

  /**
   * defaultFieldNames
   * @type {PickerFieldNames}
   */
  defaultFieldNames?: PickerFieldNames
}

/**
 * PickerExpose接口定义
 */
export interface PickerExpose {
  /**
   * 打开选择器
   *
   * @return {void}
   */
  open(): void

  /**
   * 关闭选择器
   *
   * @return {void}
   */
  close(callback?: (values: PickerValueDetail & { label: string }) => void): void
}

/**
 * PickerInstance类型定义
 */
export type PickerInstance = ComponentPublicInstance<Picker, PickerProps, PickerExpose>

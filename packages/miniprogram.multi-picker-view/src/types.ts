import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { MultiPickerView } from './index'

/**
 * MultiPickerFieldNames接口定义
 */
export interface MultiPickerFieldNames {
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
 * MultiPickerUtilsFieldNames类型定义
 */
export type MultiPickerUtilsFieldNames = {
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
   * @type {string}
   */
  disabled: string
}

/**
 * MultiPickerOption类型定义
 */
export type MultiPickerOption = string | Record<string, unknown>
/**
 * MultiPickerColumn类型定义
 */
export type MultiPickerColumn = MultiPickerOption[]
/**
 * MultiPickerOptions类型定义
 */
export type MultiPickerOptions = Array<MultiPickerColumn | MultiPickerOption>

/**
 * MultiPickerOptionRecord接口定义
 */
export interface MultiPickerOptionRecord extends Record<string, unknown> {}

/**
 * MultiPickerLabelAlign类型定义
 */
export type MultiPickerLabelAlign = 'left' | 'center' | 'right'
/**
 * MultiPickerChangeMethod类型定义
 */
export type MultiPickerChangeMethod = 'beforeChange' | 'valueChange' | 'scrollChange'

/**
 * MultiPickerItemChangeDetail接口定义
 */
export interface MultiPickerItemChangeDetail {
  /**
   * value
   * @type {string}
   */
  value: string
}

/**
 * MultiPickerValueDetail接口定义
 */
export interface MultiPickerValueDetail {
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
   * @type {MultiPickerOptionRecord[][]}
   */
  cols: MultiPickerOptionRecord[][]
}

/**
 * MultiPickerProps接口定义
 */
export interface MultiPickerProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * picker-view 组件类名前缀
   *
   * @type {string}
   */
  pickerPrefixCls?: string

  /**
   * 当前选中值
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
   * 每项高度
   *
   * @type {number}
   */
  itemHeight?: number

  /**
   * 每项样式
   *
   * @type {unknown}
   */
  itemStyle?: unknown

  /**
   * 指示器样式
   *
   * @type {unknown}
   */
  indicatorStyle?: unknown

  /**
   * 指示器类名
   *
   * @type {string}
   */
  indicatorClass?: string

  /**
   * 蒙层样式
   *
   * @type {unknown}
   */
  maskStyle?: unknown

  /**
   * 蒙层类名
   *
   * @type {string}
   */
  maskClass?: string

  /**
   * 标签对齐方式
   *
   * @type {MultiPickerLabelAlign}
   */
  labelAlign?: MultiPickerLabelAlign

  /**
   * 是否加载中
   *
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 多列选项数据
   *
   * @type {MultiPickerOptions}
   */
  options?: MultiPickerOptions

  /**
   * 选项字段映射
   *
   * @type {MultiPickerFieldNames}
   */
  defaultFieldNames?: MultiPickerFieldNames
}

/**
 * MultiPickerViewExpose接口定义
 */
export interface MultiPickerViewExpose {}

/**
 * MultiPickerViewInstance类型定义
 */
export type MultiPickerViewInstance = ComponentPublicInstance<MultiPickerView, MultiPickerProps, MultiPickerViewExpose>

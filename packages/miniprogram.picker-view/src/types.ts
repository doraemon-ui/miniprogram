import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { PickerView } from './index'

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
}

/**
 * PickerViewUtilsFieldNames类型定义
 */
export type PickerViewUtilsFieldNames = {
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
 * PickerOption类型定义
 */
export type PickerOption = string | Record<string, unknown>
/**
 * PickerOptionRecord类型定义
 */
export type PickerOptionRecord = Record<string, unknown>
/**
 * PickerLabelAlign类型定义
 */
export type PickerLabelAlign = 'left' | 'center' | 'right'

/**
 * PickerViewValueDetail接口定义
 */
export interface PickerViewValueDetail {
  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * displayValue
   * @type {string}
   */
  displayValue: string

  /**
   * selectedIndex
   * @type {number}
   */
  selectedIndex: number

  /**
   * selectedValue
   * @type {string}
   */
  selectedValue: string

  /**
   * cols
   * @type {PickerOptionRecord[]}
   */
  cols: PickerOptionRecord[]
}

/**
 * PickerViewItemDataset接口定义
 */
export interface PickerViewItemDataset {
  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * value
   * @type {string}
   */
  value?: string
}

/**
 * PickerViewProps接口定义
 */
export interface PickerViewProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 默认值
   *
   * @type {string}
   */
  defaultValue?: string

  /**
   * 当前值
   *
   * @type {string}
   */
  value?: string

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
   * @type {PickerLabelAlign}
   */
  labelAlign?: PickerLabelAlign

  /**
   * 是否加载中
   *
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 选项数据
   *
   * @type {PickerOption[]}
   */
  options?: PickerOption[]

  /**
   * 选项字段映射
   *
   * @type {PickerFieldNames}
   */
  defaultFieldNames?: PickerFieldNames
}

/**
 * PickerViewExpose接口定义
 */
export interface PickerViewExpose {}

/**
 * PickerViewInstance类型定义
 */
export type PickerViewInstance = ComponentPublicInstance<PickerView, PickerViewProps, PickerViewExpose>

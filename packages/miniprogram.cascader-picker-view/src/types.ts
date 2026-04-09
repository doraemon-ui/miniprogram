import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { CascaderPickerView } from './index'

/**
 * TreeOption类型定义
 */
export type TreeOption = Record<string, unknown>

/**
 * CascaderPickerFieldNames接口定义
 */
export interface CascaderPickerFieldNames {
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
 * CascaderPickerUtilsFieldNames类型定义
 */
export type CascaderPickerUtilsFieldNames = {
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
 * CascaderPickerLabelAlign类型定义
 */
export type CascaderPickerLabelAlign = 'left' | 'center' | 'right'

/**
 * CascaderPickerValueChangeDetail接口定义
 */
export interface CascaderPickerValueChangeDetail {
  /**
   * value
   * @type {string[]}
   */
  value: string[]

  /**
   * index
   * @type {number}
   */
  index: number
}

/**
 * CascaderPickerValueDetail接口定义
 */
export interface CascaderPickerValueDetail {
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
   * @type {TreeOption[][]}
   */
  cols: TreeOption[][]
}

/**
 * CascaderPickerViewProps接口定义
 */
export interface CascaderPickerViewProps {
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
   * 显示列数
   *
   * @type {number}
   */
  cols?: number

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
   * @type {CascaderPickerLabelAlign}
   */
  labelAlign?: CascaderPickerLabelAlign

  /**
   * 是否加载中
   *
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 级联选项数据
   *
   * @type {TreeOption[]}
   */
  options?: TreeOption[]

  /**
   * 选项字段映射
   *
   * @type {CascaderPickerFieldNames}
   */
  defaultFieldNames?: CascaderPickerFieldNames
}

/**
 * CascaderPickerViewExpose接口定义
 */
export interface CascaderPickerViewExpose {}

/**
 * CascaderPickerViewInstance类型定义
 */
export type CascaderPickerViewInstance = ComponentPublicInstance<CascaderPickerView, CascaderPickerViewProps, CascaderPickerViewExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { DatePickerView } from './index'

/**
 * PickerOption接口定义
 */
export interface PickerOption {
  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * label
   * @type {string}
   */
  label: string
}

/**
 * DatePickerViewMode类型定义
 */
export type DatePickerViewMode = 'datetime' | 'date' | 'time' | 'month' | 'year'
/**
 * DatePickerViewLang类型定义
 */
export type DatePickerViewLang = 'zh_CN' | 'zh_TW' | 'en'

/**
 * DatePickerViewUtilsFieldNames类型定义
 */
export type DatePickerViewUtilsFieldNames = {
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
 * DatePickerViewValueChangeDetail接口定义
 */
export interface DatePickerViewValueChangeDetail {
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
 * DatePickerViewValueDetail接口定义
 */
export interface DatePickerViewValueDetail {
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
   * @type {PickerOption[][]}
   */
  cols: PickerOption[][]

  /**
   * date
   * @type {number}
   */
  date: number

  /**
   * tillNow
   * @type {boolean}
   */
  tillNow: boolean
}

/**
 * DatePickerViewProps接口定义
 */
export interface DatePickerViewProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 多列选择器类名前缀
   *
   * @type {string}
   */
  multiPickerPrefixCls?: string

  /**
   * 选择器视图类名前缀
   *
   * @type {string}
   */
  pickerPrefixCls?: string

  /**
   * 当前值
   *
   * @type {unknown}
   */
  value?: unknown

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
   * @type {'left' | 'center' | 'right'}
   */
  labelAlign?: 'left' | 'center' | 'right'

  /**
   * 选择模式
   *
   * @type {DatePickerViewMode}
   */
  mode?: DatePickerViewMode

  /**
   * 分钟步长
   *
   * @type {number}
   */
  minuteStep?: number

  /**
   * 是否使用 12 小时制
   *
   * @type {boolean}
   */
  use12Hours?: boolean

  /**
   * 最小日期
   *
   * @type {unknown}
   */
  minDate?: unknown

  /**
   * 最大日期
   *
   * @type {unknown}
   */
  maxDate?: unknown

  /**
   * 最小小时
   *
   * @type {number}
   */
  minHour?: number

  /**
   * 最大小时
   *
   * @type {number}
   */
  maxHour?: number

  /**
   * 最小分钟
   *
   * @type {number}
   */
  minMinute?: number

  /**
   * 最大分钟
   *
   * @type {number}
   */
  maxMinute?: number

  /**
   * 语言
   *
   * @type {DatePickerViewLang}
   */
  lang?: DatePickerViewLang

  /**
   * 是否包含至今选项
   *
   * @type {boolean}
   */
  tillNow?: boolean
}

/**
 * DatePickerViewExpose接口定义
 */
export interface DatePickerViewExpose {}

/**
 * DatePickerViewInstance类型定义
 */
export type DatePickerViewInstance = ComponentPublicInstance<DatePickerView, DatePickerViewProps, DatePickerViewExpose>

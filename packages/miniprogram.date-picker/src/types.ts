import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { DatePicker } from './index'

/**
 * DatePickerMode类型定义
 */
export type DatePickerMode = 'datetime' | 'date' | 'year' | 'month' | 'time'
/**
 * DatePickerLang类型定义
 */
export type DatePickerLang = 'zh_CN' | 'zh_TW' | 'en'

/**
 * DatePickerToolbar接口定义
 */
export interface DatePickerToolbar {
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
 * DatePickerDetail接口定义
 */
export interface DatePickerDetail {
  /**
   * value
   * @type {unknown}
   */
  value: unknown

  /**
   * displayValue
   * @type {string[]}
   */
  displayValue?: string[]

  /**
   * selectedIndex
   * @type {number[]}
   */
  selectedIndex?: number[]

  /**
   * selectedValue
   * @type {unknown}
   */
  selectedValue?: unknown

  /**
   * cols
   * @type {unknown[]}
   */
  cols?: unknown[]

  /**
   * date
   * @type {number}
   */
  date?: number

  /**
   * tillNow
   * @type {boolean}
   */
  tillNow?: boolean
}

/**
 * DatePickerChangeDetail接口定义
 */
export interface DatePickerChangeDetail extends DatePickerDetail {
  /**
   * label
   * @type {string}
   */
  label: string
}

/**
 * DatePickerProps接口定义
 */
export interface DatePickerProps {
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
   * 顶部工具栏配置
   *
   * @type {DatePickerToolbar}
   */
  toolbar?: DatePickerToolbar

  /**
   * 默认是否显示
   *
   * @type {boolean}
   */
  defaultVisible?: boolean

  /**
   * 是否显示
   *
   * @type {boolean}
   */
  visible?: boolean

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
   * @type {DatePickerMode}
   */
  mode?: DatePickerMode

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
   * @type {DatePickerLang}
   */
  lang?: DatePickerLang

  /**
   * 是否包含至今选项
   *
   * @type {boolean}
   */
  tillNow?: boolean
}

/**
 * DatePickerExpose接口定义
 */
export interface DatePickerExpose {
  /**
   * 打开组件
   *
   * @return {void}
   */
  open(): void

  /**
   * 关闭组件
   *
   * @return {void}
   */
  close(callback?: (values: DatePickerChangeDetail) => void): void
}

/**
 * DatePickerInstance类型定义
 */
export type DatePickerInstance = ComponentPublicInstance<DatePicker, DatePickerProps, DatePickerExpose>

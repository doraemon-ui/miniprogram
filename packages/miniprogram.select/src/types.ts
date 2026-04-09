import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Select } from './index'

/**
 * PopupOption类型定义
 */
export type PopupOption =
  | string
  | {
      title?: string
      label?: string
      value?: string
      key?: string
      disabled?: boolean
      options?: PopupOption[]
    }

/**
 * FlattenOption接口定义
 */
export interface FlattenOption {
  /**
   * title
   * @type {string}
   */
  title: string

  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * isGroup
   * @type {boolean}
   */
  isGroup?: boolean
}

/**
 * SelectToolbar接口定义
 */
export interface SelectToolbar {
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
 * OpenOptions接口定义
 */
export interface OpenOptions {
  /**
   * prefixCls
   * @type {string}
   */
  prefixCls?: string

  /**
   * value
   * @type {string | string[]}
   */
  value?: string | string[]

  /**
   * options
   * @type {PopupOption[]}
   */
  options?: PopupOption[]

  /**
   * multiple
   * @type {boolean}
   */
  multiple?: boolean

  /**
   * max
   * @type {number | string}
   */
  max?: number | string

  /**
   * notFoundContent
   * @type {unknown}
   */
  notFoundContent?: unknown

  /**
   * virtualized
   * @type {boolean}
   */
  virtualized?: boolean

  /**
   * toolbar
   * @type {SelectToolbar}
   */
  toolbar?: SelectToolbar
  onChange?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void
  onConfirm?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void
  onCancel?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void
}

/**
 * SelectProps接口定义
 */
export interface SelectProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 当前值
   *
   * @type {(string | string[])}
   */
  value?: string | string[]

  /**
   * 选项数据
   *
   * @type {PopupOption[]}
   */
  options?: PopupOption[]

  /**
   * 是否多选
   *
   * @type {boolean}
   */
  multiple?: boolean

  /**
   * 最大可选数
   *
   * @type {number}
   */
  max?: number

  /**
   * 空状态文案
   *
   * @type {unknown}
   */
  notFoundContent?: unknown

  /**
   * 是否虚拟列表
   *
   * @type {boolean}
   */
  virtualized?: boolean

  /**
   * 工具栏配置
   *
   * @type {SelectToolbar}
   */
  toolbar?: SelectToolbar
}

/**
 * SelectExpose接口定义
 */
export interface SelectExpose {
  /**
   * 打开选择器
   *
   * @return {void}
   */
  open(opts?: OpenOptions): void

  /**
   * 关闭选择器
   *
   * @return {void}
   */
  close(callback?: () => void): void
}

/**
 * SelectInstance类型定义
 */
export type SelectInstance = ComponentPublicInstance<Select, SelectProps, SelectExpose>

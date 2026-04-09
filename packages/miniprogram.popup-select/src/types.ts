import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { PopupSelect } from './index'

/**
 * SelectOption接口定义
 */
export interface SelectOption {
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
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * isGroup
   * @type {boolean}
   */
  isGroup?: boolean

  /**
   * isGroupOption
   * @type {boolean}
   */
  isGroupOption?: boolean
}

/**
 * PopupSelectToolbar接口定义
 */
export interface PopupSelectToolbar {
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
 * PopupSelectNotFoundContent接口定义
 */
export interface PopupSelectNotFoundContent {
  /**
   * icon
   * @type {string}
   */
  icon: string

  /**
   * title
   * @type {string}
   */
  title: string

  /**
   * text
   * @type {string}
   */
  text: string
}

/**
 * PopupSelectChangeDetail接口定义
 */
export interface PopupSelectChangeDetail {
  /**
   * visible
   * @type {boolean}
   */
  visible: boolean
}

/**
 * PopupSelectValueDetail接口定义
 */
export interface PopupSelectValueDetail {
  /**
   * value
   * @type {string | string[]}
   */
  value: string | string[]

  /**
   * options
   * @type {SelectOption[]}
   */
  options: SelectOption[]
}

/**
 * PopupSelectProps接口定义
 */
export interface PopupSelectProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 过渡的类名
   *
   * @type {string}
   */
  classNames?: string

  /**
   * 是否虚拟列表
   *
   * @type {boolean}
   */
  virtualized?: boolean

  /**
   * 空状态文案
   *
   * @type {unknown}
   */
  notFoundContent?: unknown

  /**
   * 当前值
   *
   * @type {string | string[]}
   */
  value?: string | string[]

  /**
   * 选项数据
   *
   * @type {Array<string | Record<string, unknown>>}
   */
  options?: Array<string | Record<string, unknown>>

  /**
   * 图标位置
   *
   * @type {string}
   */
  iconPosition?: string

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
   * 工具栏配置
   *
   * @type {PopupSelectToolbar}
   */
  toolbar?: PopupSelectToolbar

  /**
   * 是否可见
   *
   * @type {boolean}
   */
  visible?: boolean

  /**
   * 默认是否可见
   *
   * @type {boolean}
   */
  defaultVisible?: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean
}

/**
 * PopupSelectExpose接口定义
 */
export interface PopupSelectExpose {
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
  close(): void
}

/**
 * PopupSelectInstance类型定义
 */
export type PopupSelectInstance = ComponentPublicInstance<PopupSelect, PopupSelectProps, PopupSelectExpose>

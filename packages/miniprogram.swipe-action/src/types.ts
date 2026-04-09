import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { SwipeAction } from './index'

/**
 * ActionItem接口定义
 */
export interface ActionItem {
  /**
   * text
   * @type {string}
   */
  text?: string

  /**
   * style
   * @type {string}
   */
  style?: string

  /**
   * className
   * @type {string}
   */
  className?: string

  /**
   * key: string
   * @type {string]: unknown}
   */
  [key: string]: unknown
}

/**
 * SwipeActionProps接口定义
 */
export interface SwipeActionProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 点击后是否自动关闭
   *
   * @type {boolean}
   */
  autoClose?: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 左侧操作项
   *
   * @type {ActionItem[]}
   */
  left?: ActionItem[]

  /**
   * 右侧操作项
   *
   * @type {ActionItem[]}
   */
  right?: ActionItem[]

  /**
   * 是否使用插槽渲染操作区
   *
   * @type {boolean}
   */
  useSlots?: boolean

  /**
   * 附加数据
   *
   * @type {unknown}
   */
  data?: unknown
}

/**
 * SwipeActionExpose接口定义
 */
export interface SwipeActionExpose {}

/**
 * SwipeActionInstance类型定义
 */
export type SwipeActionInstance = ComponentPublicInstance<SwipeAction, SwipeActionProps, SwipeActionExpose>

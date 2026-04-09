import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Notification } from './index'

/**
 * NotificationProps接口定义
 */
export interface NotificationProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 点击态类名
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 外层样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>
}

/**
 * NotificationExpose接口定义
 */
export interface NotificationExpose {}

/**
 * NotificationInstance类型定义
 */
export type NotificationInstance = ComponentPublicInstance<Notification, NotificationProps, NotificationExpose>

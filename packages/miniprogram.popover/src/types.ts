import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Popover } from './index'

/**
 * PopoverProps接口定义
 */
export interface PopoverProps {
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
 * PopoverExpose接口定义
 */
export interface PopoverExpose {}

/**
 * PopoverInstance类型定义
 */
export type PopoverInstance = ComponentPublicInstance<Popover, PopoverProps, PopoverExpose>

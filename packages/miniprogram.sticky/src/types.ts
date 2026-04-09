import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Sticky } from './index'

/**
 * StickyProps接口定义
 */
export interface StickyProps {
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
 * StickyExpose接口定义
 */
export interface StickyExpose {}

/**
 * StickyInstance类型定义
 */
export type StickyInstance = ComponentPublicInstance<Sticky, StickyProps, StickyExpose>

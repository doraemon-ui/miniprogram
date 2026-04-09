import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Filterbar } from './index'

/**
 * FilterbarProps接口定义
 */
export interface FilterbarProps {
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
 * FilterbarExpose接口定义
 */
export interface FilterbarExpose {}

/**
 * FilterbarInstance类型定义
 */
export type FilterbarInstance = ComponentPublicInstance<Filterbar, FilterbarProps, FilterbarExpose>

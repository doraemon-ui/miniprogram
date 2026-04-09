import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { FloatingPanel } from './index'

/**
 * FloatingPanelProps接口定义
 */
export interface FloatingPanelProps {
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
 * FloatingPanelExpose接口定义
 */
export interface FloatingPanelExpose {}

/**
 * FloatingPanelInstance类型定义
 */
export type FloatingPanelInstance = ComponentPublicInstance<FloatingPanel, FloatingPanelProps, FloatingPanelExpose>

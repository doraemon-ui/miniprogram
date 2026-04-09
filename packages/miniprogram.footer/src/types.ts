import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Footer } from './index'

/**
 * FooterProps接口定义
 */
export interface FooterProps {
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
 * FooterExpose接口定义
 */
export interface FooterExpose {}

/**
 * FooterInstance类型定义
 */
export type FooterInstance = ComponentPublicInstance<Footer, FooterProps, FooterExpose>

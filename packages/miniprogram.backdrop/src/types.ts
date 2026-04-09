import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Backdrop } from './index'

/**
 * BackdropProps接口定义
 */
export interface BackdropProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * transparent
   * @type {boolean}
   */
  transparent?: boolean

  /**
   * zIndex
   * @type {number}
   */
  zIndex?: number

  /**
   * mountOnEnter
   * @type {boolean}
   */
  mountOnEnter?: boolean

  /**
   * unmountOnExit
   * @type {boolean}
   */
  unmountOnExit?: boolean

  /**
   * disableScroll
   * @type {boolean}
   */
  disableScroll?: boolean

  /**
   * visible
   * @type {boolean}
   */
  visible?: boolean

  /**
   * classNames
   * @type {string}
   */
  classNames?: string

  /**
   * wrapStyle
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>
}

/**
 * BackdropExpose接口定义
 */
export interface BackdropExpose {
  /**
   * backdropHolds
   * @type {number}
   */
  backdropHolds: number

  /**
   * 保持锁定
   *
   * @return {void}
   */
  retain(): void

  /**
   * 释放锁定
   *
   * @return {void}
   */
  release(): void
}

/**
 * BackdropInstance类型定义
 */
export type BackdropInstance = ComponentPublicInstance<Backdrop, BackdropProps, BackdropExpose>

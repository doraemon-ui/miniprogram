import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Gallery } from './index'

/**
 * GalleryProps接口定义
 */
export interface GalleryProps {
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
 * GalleryExpose接口定义
 */
export interface GalleryExpose {}

/**
 * GalleryInstance类型定义
 */
export type GalleryInstance = ComponentPublicInstance<Gallery, GalleryProps, GalleryExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Image } from './index'

/**
 * ImageProps接口定义
 */
export interface ImageProps {
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
 * ImageExpose接口定义
 */
export interface ImageExpose {}

/**
 * ImageInstance类型定义
 */
export type ImageInstance = ComponentPublicInstance<Image, ImageProps, ImageExpose>

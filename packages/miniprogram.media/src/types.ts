import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Media } from './index'

/**
 * MediaProps接口定义
 */
export interface MediaProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 缩略图地址
   *
   * @type {string}
   */
  thumb?: string

  /**
   * 缩略图样式
   *
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  thumbStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 描述
   *
   * @type {string}
   */
  label?: string

  /**
   * 垂直对齐方式
   *
   * @type {string}
   */
  align?: string
}

/**
 * MediaExpose接口定义
 */
export interface MediaExpose {}

/**
 * MediaInstance类型定义
 */
export type MediaInstance = ComponentPublicInstance<Media, MediaProps, MediaExpose>

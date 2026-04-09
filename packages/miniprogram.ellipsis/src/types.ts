import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Ellipsis } from './index'

/**
 * EllipsisDirection类型定义
 */
export type EllipsisDirection = 'start' | 'middle' | 'end'

/**
 * EllipsisTextRange接口定义
 */
export interface EllipsisTextRange {
  /**
   * leading
   * @type {string}
   */
  leading: string

  /**
   * tailing
   * @type {string}
   */
  tailing: string
}

/**
 * EllipsisProps接口定义
 */
export interface EllipsisProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 原始文本内容
   *
   * @type {string}
   */
  content?: string

  /**
   * 省略方向
   *
   * @type {EllipsisDirection}
   */
  direction?: EllipsisDirection

  /**
   * 默认是否展开
   *
   * @type {boolean}
   */
  defaultExpanded?: boolean

  /**
   * 展开按钮文本
   *
   * @type {string}
   */
  expandText?: string

  /**
   * 收起按钮文本
   *
   * @type {string}
   */
  collapseText?: string

  /**
   * 最大显示行数
   *
   * @type {number}
   */
  rows?: number
}

/**
 * EllipsisExpose接口定义
 */
export interface EllipsisExpose {}

/**
 * EllipsisInstance类型定义
 */
export type EllipsisInstance = ComponentPublicInstance<Ellipsis, EllipsisProps, EllipsisExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { WhiteSpace } from './index'

/**
 * WhiteSpaceSize类型定义
 */
export type WhiteSpaceSize = 'small' | 'default' | 'large'

/**
 * WhiteSpaceProps接口定义
 */
export interface WhiteSpaceProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 间距尺寸
   *
   * @type {WhiteSpaceSize}
   */
  size?: WhiteSpaceSize

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  bodyStyle?: string | Partial<CSSStyleDeclaration>
}

/**
 * WhiteSpaceExpose接口定义
 */
export interface WhiteSpaceExpose {}

/**
 * WhiteSpaceInstance类型定义
 */
export type WhiteSpaceInstance = ComponentPublicInstance<WhiteSpace, WhiteSpaceProps, WhiteSpaceExpose>

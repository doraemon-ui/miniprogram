import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { WingBlank } from './index'

/**
 * WingBlankSize类型定义
 */
export type WingBlankSize = 'small' | 'default' | 'large'

/**
 * WingBlankProps接口定义
 */
export interface WingBlankProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 两侧留白尺寸
   *
   * @type {WingBlankSize}
   */
  size?: WingBlankSize

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  bodyStyle?: string | Partial<CSSStyleDeclaration>
}

/**
 * WingBlankExpose接口定义
 */
export interface WingBlankExpose {}

/**
 * WingBlankInstance类型定义
 */
export type WingBlankInstance = ComponentPublicInstance<WingBlank, WingBlankProps, WingBlankExpose>

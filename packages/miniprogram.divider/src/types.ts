import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Divider } from './index'

/**
 * DividerPosition类型定义
 */
export type DividerPosition = 'left' | 'center' | 'right'
/**
 * DividerDirection类型定义
 */
export type DividerDirection = 'horizontal' | 'vertical'

/**
 * DividerProps接口定义
 */
export interface DividerProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 文本位置
   *
   * @type {DividerPosition}
   */
  position?: DividerPosition

  /**
   * 是否虚线
   *
   * @type {boolean}
   */
  dashed?: boolean

  /**
   * 分割线文本
   *
   * @type {string}
   */
  text?: string

  /**
   * 是否显示文本
   *
   * @type {boolean}
   */
  showText?: boolean

  /**
   * 分割线方向
   *
   * @type {DividerDirection}
   */
  direction?: DividerDirection
}

/**
 * DividerExpose接口定义
 */
export interface DividerExpose {}

/**
 * DividerInstance类型定义
 */
export type DividerInstance = ComponentPublicInstance<Divider, DividerProps, DividerExpose>

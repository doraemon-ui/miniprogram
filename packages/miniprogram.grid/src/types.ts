import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Grid } from './index'

/**
 * GridProps接口定义
 */
export interface GridProps {
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
 * GridExpose接口定义
 */
export interface GridExpose {}

/**
 * GridInstance类型定义
 */
export type GridInstance = ComponentPublicInstance<Grid, GridProps, GridExpose>

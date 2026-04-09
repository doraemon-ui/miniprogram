import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Row } from './index'

/**
 * RowProps接口定义
 */
export interface RowProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 栅格间隔（px）
   *
   * @type {number}
   */
  gutter?: number
}

/**
 * RowExpose接口定义
 */
export interface RowExpose {}

/**
 * RowInstance类型定义
 */
export type RowInstance = ComponentPublicInstance<Row, RowProps, RowExpose>

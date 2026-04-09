import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Spin } from './index'

/**
 * SpinProps接口定义
 */
export interface SpinProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 过渡的类名
   *
   * @type {string}
   */
  classNames?: string

  /**
   * 提示文案
   *
   * @type {string}
   */
  tip?: string

  /**
   * 尺寸
   *
   * @type {string}
   */
  size?: string

  /**
   * 是否加载中
   *
   * @type {boolean}
   */
  spinning?: boolean

  /**
   * 是否嵌套模式
   *
   * @type {boolean}
   */
  nested?: boolean

  /**
   * 加载器颜色
   *
   * @type {string}
   */
  spinColor?: string
}

/**
 * SpinExpose接口定义
 */
export interface SpinExpose {}

/**
 * SpinInstance类型定义
 */
export type SpinInstance = ComponentPublicInstance<Spin, SpinProps, SpinExpose>

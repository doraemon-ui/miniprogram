import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Icon } from './index'

/**
 * IconProps接口定义
 */
export interface IconProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否隐藏
   *
   * @type {boolean}
   */
  hidden?: boolean

  /**
   * 图标类型
   *
   * @type {string}
   */
  type?: string

  /**
   * 图标尺寸
   *
   * @type {(string | number)}
   */
  size?: string | number

  /**
   * 图标颜色
   *
   * @type {string}
   */
  color?: string
}

/**
 * IconExpose接口定义
 */
export interface IconExpose {}

/**
 * IconInstance类型定义
 */
export type IconInstance = ComponentPublicInstance<Icon, IconProps, IconExpose>

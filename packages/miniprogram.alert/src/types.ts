import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Alert } from './index'

/**
 * AlertProps接口定义
 */
export interface AlertProps {
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
   * 主题色
   *
   * @type {PresetColor}
   */
  theme?: PresetColor

  /**
   * 缩略图
   *
   * @type {string}
   */
  thumb?: string

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
   * 是否显示关闭按钮
   *
   * @type {boolean}
   */
  closable?: boolean
}

/**
 * AlertExpose接口定义
 */
export interface AlertExpose {}

/**
 * AlertInstance类型定义
 */
export type AlertInstance = ComponentPublicInstance<Alert, AlertProps, AlertExpose>

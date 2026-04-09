import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Switch } from './index'

/**
 * SwitchProps接口定义
 */
export interface SwitchProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 当前值
   *
   * @type {boolean}
   */
  value?: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否加载中
   *
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 主题色
   *
   * @type {string}
   */
  color?: string

  /**
   * 选中文案
   *
   * @type {string}
   */
  checkedText?: string

  /**
   * 未选中文案
   *
   * @type {string}
   */
  uncheckedText?: string
}

/**
 * SwitchExpose接口定义
 */
export interface SwitchExpose {}

/**
 * SwitchInstance类型定义
 */
export type SwitchInstance = ComponentPublicInstance<Switch, SwitchProps, SwitchExpose>

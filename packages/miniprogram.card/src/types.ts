import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Card } from './index'

/**
 * CardActionType类型定义
 */
export type CardActionType = 'default' | 'primary' | 'warn'

/**
 * CardAction接口定义
 */
export interface CardAction {
  /**
   * 动作项文案
   *
   * @type {string}
   */
  text?: string

  /**
   * 动作项类型
   *
   * @type {CardActionType}
   */
  type?: CardActionType

  /**
   * 是否加粗
   *
   * @type {boolean}
   */
  bold?: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 自定义类名
   *
   * @type {string}
   */
  className?: string

  /**
   * 自定义点击态类名
   *
   * @type {string}
   */
  hoverClass?: string
}

/**
 * CardThumbStyle类型定义
 */
export type CardThumbStyle = string | Partial<CSSStyleDeclaration>

/**
 * CardProps接口定义
 */
export interface CardProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 点击态类名
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 是否显示边框
   *
   * @type {boolean}
   */
  bordered?: boolean

  /**
   * 是否全宽
   *
   * @type {boolean}
   */
  full?: boolean

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 缩略图地址
   *
   * @type {string}
   */
  thumb?: string

  /**
   * 缩略图样式
   *
   * @type {CardThumbStyle}
   */
  thumbStyle?: CardThumbStyle

  /**
   * 右上角额外内容
   *
   * @type {string}
   */
  extra?: string

  /**
   * 底部动作列表
   *
   * @type {CardAction[]}
   */
  actions?: CardAction[]
}

/**
 * CardExpose接口定义
 */
export interface CardExpose {}

/**
 * CardInstance类型定义
 */
export type CardInstance = ComponentPublicInstance<Card, CardProps, CardExpose>

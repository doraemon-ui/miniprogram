import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Selectable } from './index'

/**
 * SelectableType类型定义
 */
export type SelectableType = 'checkbox' | 'radio'

/**
 * SelectableProps接口定义
 */
export interface SelectableProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * type
   * @type {SelectableType}
   */
  type?: SelectableType

  /**
   * value
   * @type {string}
   */
  value?: string

  /**
   * defaultChecked
   * @type {boolean}
   */
  defaultChecked?: boolean

  /**
   * checked
   * @type {boolean}
   */
  checked?: boolean

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * readOnly
   * @type {boolean}
   */
  readOnly?: boolean

  /**
   * color
   * @type {string}
   */
  color?: string

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * wrapStyle
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * iconSize
   * @type {string}
   */
  iconSize?: string

  /**
   * iconOn
   * @type {string}
   */
  iconOn?: string

  /**
   * iconOff
   * @type {string}
   */
  iconOff?: string
}

/**
 * SelectableExpose接口定义
 */
export interface SelectableExpose {}

/**
 * SelectableInstance类型定义
 */
export type SelectableInstance = ComponentPublicInstance<Selectable, SelectableProps, SelectableExpose>

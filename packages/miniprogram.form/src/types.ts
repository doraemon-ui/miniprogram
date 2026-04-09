import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Form } from './index'

/**
 * FormProps接口定义
 */
export interface FormProps {
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
 * FormExpose接口定义
 */
export interface FormExpose {}

/**
 * FormInstance类型定义
 */
export type FormInstance = ComponentPublicInstance<Form, FormProps, FormExpose>

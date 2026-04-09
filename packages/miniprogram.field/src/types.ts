import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Field } from './index'

/**
 * FieldContext接口定义
 */
export interface FieldContext {
  /**
   * layout
   * @type {'horizontal' | 'vertical' | 'none'}
   */
  layout: 'horizontal' | 'vertical' | 'none'

  /**
   * requiredMarkStyle
   * @type {'asterisk' | 'text-required' | 'text-optional'}
   */
  requiredMarkStyle: 'asterisk' | 'text-required' | 'text-optional'

  /**
   * asteriskText
   * @type {string}
   */
  asteriskText: string

  /**
   * requiredText
   * @type {string}
   */
  requiredText: string

  /**
   * optionalText
   * @type {string}
   */
  optionalText: string

  /**
   * disabled
   * @type {boolean}
   */
  disabled: boolean

  /**
   * readOnly
   * @type {boolean}
   */
  readOnly: boolean
}

/**
 * FieldProps接口定义
 */
export interface FieldProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 标签文本
   *
   * @type {string}
   */
  label?: string

  /**
   * 标签是否换行
   *
   * @type {boolean}
   */
  labelWrap?: boolean

  /**
   * 右侧额外内容
   *
   * @type {string}
   */
  extra?: string

  /**
   * 帮助文案
   *
   * @type {string}
   */
  help?: string

  /**
   * 子元素位置
   *
   * @type {string}
   */
  childElementPosition?: string

  /**
   * 是否展示链接箭头
   *
   * @type {boolean}
   */
  isLink?: boolean

  /**
   * 纵向对齐方式
   *
   * @type {string}
   */
  align?: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   */
  readOnly?: boolean

  /**
   * 是否隐藏
   *
   * @type {boolean}
   */
  hidden?: boolean

  /**
   * 是否必填
   *
   * @type {boolean}
   */
  required?: boolean

  /**
   * 校验反馈文案
   *
   * @type {string[]}
   */
  feedbackMessage?: string[]

  /**
   * 是否显示反馈状态
   *
   * @type {boolean}
   */
  hasFeedback?: boolean

  /**
   * 当前索引
   *
   * @type {number}
   */
  index?: number

  /**
   * 是否最后一项
   *
   * @type {boolean}
   */
  isLast?: boolean
}

/**
 * FieldExpose接口定义
 */
export interface FieldExpose {}

/**
 * FieldInstance类型定义
 */
export type FieldInstance = ComponentPublicInstance<Field, FieldProps, FieldExpose>

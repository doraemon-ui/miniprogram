import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Textarea } from './index'

/**
 * TextareaProps接口定义
 */
export interface TextareaProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * label
   * @type {string}
   */
  label?: string

  /**
   * extra
   * @type {string}
   */
  extra?: string

  /**
   * defaultValue
   * @type {string}
   */
  defaultValue?: string

  /**
   * value
   * @type {string}
   */
  value?: string

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

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
   * rows
   * @type {number}
   */
  rows?: number

  /**
   * hasCount
   * @type {boolean}
   */
  hasCount?: boolean

  /**
   * clear
   * @type {boolean}
   */
  clear?: boolean

  /**
   * error
   * @type {boolean}
   */
  error?: boolean

  /**
   * placeholderStyle
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  placeholderStyle?: string | Partial<CSSStyleDeclaration>
}

/**
 * TextareaExpose接口定义
 */
export interface TextareaExpose {}

/**
 * TextareaInstance类型定义
 */
export type TextareaInstance = ComponentPublicInstance<Textarea, TextareaProps, TextareaExpose>

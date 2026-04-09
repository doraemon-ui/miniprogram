import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Prompt } from './index'

/**
 * PromptProps接口定义
 */
export interface PromptProps {
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
 * PromptExpose接口定义
 */
export interface PromptExpose {}

/**
 * PromptInstance类型定义
 */
export type PromptInstance = ComponentPublicInstance<Prompt, PromptProps, PromptExpose>

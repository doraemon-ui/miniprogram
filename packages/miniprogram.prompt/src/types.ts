import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group'
import type { ButtonProps } from '@doraemon-ui/miniprogram.button'

import type { Prompt } from './index'

export interface PromptButton extends Omit<ButtonProps, 'prefixCls'> {
  /**
   * 按钮文案
   */
  text?: string

  /**
   * 自定义按钮类名
   */
  className?: string
}

/**
 * PromptProps接口定义
 */
export interface PromptProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string

  /**
   * 动画类名
   */
  classNames?: ClassNames

  /**
   * 图标
   */
  icon?: string

  /**
   * 标题
   */
  title?: string

  /**
   * 描述文案
   */
  text?: string

  /**
   * 按钮列表
   */
  buttons?: PromptButton[]

  /**
   * 是否显示
   */
  visible?: boolean

  /**
   * 外层样式
   */
  wrapStyle?: string | Partial<CSSStyleDeclaration>
}

/**
 * PromptExpose接口定义
 */
export interface PromptExpose {}

export interface PromptClassItem {
  wrap: string
  hover: string
}

/**
 * PromptInstance类型定义
 */
export type PromptInstance = ComponentPublicInstance<Prompt, PromptProps, PromptExpose>

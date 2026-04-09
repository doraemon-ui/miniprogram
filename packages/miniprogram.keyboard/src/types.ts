import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Keyboard } from './index'

/**
 * KeyboardShowOptions接口定义
 */
export interface KeyboardShowOptions {
  /**
   * prefixCls
   * @type {string}
   */
  prefixCls?: string

  /**
   * className
   * @type {string}
   */
  className?: string

  /**
   * titleText
   * @type {string}
   */
  titleText?: string

  /**
   * cancelText
   * @type {string}
   */
  cancelText?: string

  /**
   * inputText
   * @type {string}
   */
  inputText?: string

  /**
   * showCancel
   * @type {boolean}
   */
  showCancel?: boolean

  /**
   * disorder
   * @type {boolean}
   */
  disorder?: boolean

  /**
   * password
   * @type {boolean}
   */
  password?: boolean

  /**
   * maxlength
   * @type {number}
   */
  maxlength?: number

  /**
   * closeOnReject
   * @type {boolean}
   */
  closeOnReject?: boolean
  onChange?: (value: string) => void
  callback?: (value: string) => unknown
  onClose?: (value: string) => unknown
}

/**
 * KeyboardProps接口定义
 */
export interface KeyboardProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string
}

/**
 * KeyboardExpose接口定义
 */
export interface KeyboardExpose {
  /**
   * 显示键盘
   *
   * @return {(() => void)}
   */
  show(opts?: KeyboardShowOptions): () => void

  /**
   * 隐藏键盘
   *
   * @return {void}
   */
  hide(): void
}

/**
 * KeyboardInstance类型定义
 */
export type KeyboardInstance = ComponentPublicInstance<Keyboard, KeyboardProps, KeyboardExpose>

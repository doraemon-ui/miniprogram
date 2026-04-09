import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

import type { Toptips } from './index'

/**
 * ToptipsShowProps接口定义
 */
export interface ToptipsShowProps {
  /**
   * prefixCls
   * @type {string}
   */
  prefixCls?: string

  /**
   * classNames
   * @type {string}
   */
  classNames?: string

  /**
   * icon
   * @type {string}
   */
  icon?: string

  /**
   * hidden
   * @type {boolean}
   */
  hidden?: boolean

  /**
   * text
   * @type {string}
   */
  text?: string

  /**
   * duration
   * @type {number}
   */
  duration?: number
  success?: () => void
}

/**
 * ToptipsShowOptions接口定义
 */
export interface ToptipsShowOptions {
  /**
   * selector
   * @type {string}
   */
  selector?: string

  /**
   * instance
   * @type {MiniprogramPublicInstance}
   */
  instance?: MiniprogramPublicInstance
}

/**
 * ToptipsProps接口定义
 */
export interface ToptipsProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * classNames
   * @type {string}
   */
  classNames?: string

  /**
   * icon
   * @type {string}
   */
  icon?: string

  /**
   * hidden
   * @type {boolean}
   */
  hidden?: boolean

  /**
   * text
   * @type {string}
   */
  text?: string

  /**
   * duration
   * @type {number}
   */
  duration?: number
}

/**
 * ToptipsExpose接口定义
 */
export interface ToptipsExpose {}

/**
 * ToptipsInternalMethods接口定义
 */
export interface ToptipsInternalMethods {
  /**
   * 显示组件
   *
   * @return {any}
   */
  show(props?: ToptipsShowProps): any

  /**
   * 隐藏组件
   *
   * @return {boolean}
   */
  hide(): boolean
}

/**
 * ToptipsInstance类型定义
 */
export type ToptipsInstance = ComponentPublicInstance<Toptips, ToptipsProps, ToptipsExpose> & ToptipsInternalMethods

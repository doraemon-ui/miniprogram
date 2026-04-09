import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Loading } from './index'

/**
 * LoadingShowOptions接口定义
 */
export interface LoadingShowOptions {
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
   * text
   * @type {string}
   */
  text?: string

  /**
   * mask
   * @type {boolean}
   */
  mask?: boolean

  /**
   * transparent
   * @type {boolean}
   */
  transparent?: boolean
}

/**
 * LoadingProps接口定义
 */
export interface LoadingProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string
}

/**
 * LoadingExpose接口定义
 */
export interface LoadingExpose {
  /**
   * 显示加载中
   *
   * @return {void}
   */
  show(opts?: LoadingShowOptions): void

  /**
   * 隐藏加载中
   *
   * @return {void}
   */
  hide(): void
}

/**
 * LoadingInstance类型定义
 */
export type LoadingInstance = ComponentPublicInstance<Loading, LoadingProps, LoadingExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Refresher } from './index'

/**
 * TouchPoint接口定义
 */
export interface TouchPoint {
  /**
   * x
   * @type {number}
   */
  x: number

  /**
   * y
   * @type {number}
   */
  y: number
}

/**
 * RefresherProps接口定义
 */
export interface RefresherProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 下拉图标
   *
   * @type {string}
   */
  pullingIcon?: string

  /**
   * 下拉文案
   *
   * @type {string}
   */
  pullingText?: string

  /**
   * 刷新图标
   *
   * @type {string}
   */
  refreshingIcon?: string

  /**
   * 刷新文案
   *
   * @type {string}
   */
  refreshingText?: string

  /**
   * 是否禁用下拉旋转动画
   *
   * @type {boolean}
   */
  disablePullingRotation?: boolean

  /**
   * 触发刷新距离
   *
   * @type {number}
   */
  distance?: number

  /**
   * 加载区类名前缀
   *
   * @type {string}
   */
  prefixLCls?: string

  /**
   * 是否显示加载文案
   *
   * @type {boolean}
   */
  isShowLoadingText?: boolean

  /**
   * 加载中文案
   *
   * @type {string}
   */
  loadingText?: string

  /**
   * 无更多数据文案
   *
   * @type {string}
   */
  loadNoDataText?: string

  /**
   * 当前滚动位置
   *
   * @type {number}
   */
  scrollTop?: number
}

/**
 * RefresherExpose接口定义
 */
export interface RefresherExpose {
  /**
   * 触发刷新
   *
   * @return {void}
   */
  triggerRefresh(diffY?: number): void

  /**
   * 结束下拉刷新
   *
   * @return {void}
   */
  finishPullToRefresh(): void

  /**
   * 结束加载更多
   *
   * @return {void}
   */
  finishLoadmore(isEnd?: boolean): void
}

/**
 * RefresherInstance类型定义
 */
export type RefresherInstance = ComponentPublicInstance<Refresher, RefresherProps, RefresherExpose>

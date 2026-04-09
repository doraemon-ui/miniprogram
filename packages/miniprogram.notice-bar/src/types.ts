import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { NoticeBar } from './index'

/**
 * NoticeBarMode类型定义
 */
export type NoticeBarMode = '' | 'link' | 'closable'

/**
 * NoticeBarClickDetail接口定义
 */
export interface NoticeBarClickDetail {}

/**
 * NoticeBarProps接口定义
 */
export interface NoticeBarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 左侧图标
   *
   * @type {string}
   */
  icon?: string

  /**
   * 通知内容
   *
   * @type {string}
   */
  content?: string

  /**
   * 模式
   *
   * @type {NoticeBarMode}
   */
  mode?: NoticeBarMode

  /**
   * 操作图标
   *
   * @type {string}
   */
  action?: string

  /**
   * 是否循环滚动
   *
   * @type {boolean}
   */
  loop?: boolean

  /**
   * 首次滚动延迟（ms）
   *
   * @type {number}
   */
  leading?: number

  /**
   * 每轮滚动后停顿（ms）
   *
   * @type {number}
   */
  trailing?: number

  /**
   * 滚动速度（ms）
   *
   * @type {number}
   */
  speed?: number
}

/**
 * NoticeBarExpose接口定义
 */
export interface NoticeBarExpose {
  /**
   * 重置动画
   *
   * @return {void}
   */
  resetAnimation(): void

  /**
   * 停止动画
   *
   * @return {void}
   */
  stopAnimation(): void
}

/**
 * NoticeBarInstance类型定义
 */
export type NoticeBarInstance = ComponentPublicInstance<NoticeBar, NoticeBarProps, NoticeBarExpose>

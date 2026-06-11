import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'

import type { IndexList } from './index'
import type { IndexListItem } from './item'

export interface IndexListNavProps {
  index: number
  name: string
  brief: string
}

/**
 * IndexListPointNode接口定义
 */
export interface IndexListPointNode extends MiniprogramDOMRect {
  /**
   * offsets
   * @type {[number, number]}
   */
  offsets: [number, number]
}

/**
 * IndexListIndicatorPosition类型定义
 */
export type IndexListIndicatorPosition = 'left' | 'center' | 'right'

/**
 * IndexListProps接口定义
 */
export interface IndexListProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 组件高度
   *
   * @type {(string | number)}
   */
  height?: string | number

  /**
   * 是否显示提示指示器
   *
   * @type {boolean}
   */
  showIndicator?: boolean

  /**
   * 提示指示器位置
   *
   * @type {IndexListIndicatorPosition}
   */
  indicatorPosition?: IndexListIndicatorPosition

  /**
   * 父容器顶部偏移
   *
   * @type {number}
   */
  parentOffsetTop?: number
}

/**
 * IndexListExpose接口定义
 */
export interface IndexListExpose {
  /**
   * 滚动到指定项
   *
   * @return {void}
   */
  scrollTo(index: number | string): void

  /**
   * @internal 此方法仅用于内部，不应在外部使用
   */
  updateNavList(): void
}

/**
 * IndexListInstance类型定义
 */
export type IndexListInstance = ComponentPublicInstance<IndexList, IndexListProps, IndexListExpose>

/**
 * IndexListItemProps接口定义
 */
export interface IndexListItemProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 分组名称
   *
   * @type {string}
   */
  name?: string
}

/**
 * IndexListItemExpose接口定义
 */
export interface IndexListItemExpose {
  index: number
  top: number
  height: number
  brief: string
  /**
   * 更新激活状态
   *
   * @return {void}
   */
  updated(index: number): void
}

/**
 * IndexListItemInstance类型定义
 */
export type IndexListItemInstance = ComponentPublicInstance<IndexListItem, IndexListItemProps, IndexListItemExpose>

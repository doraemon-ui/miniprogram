import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { VirtualList } from './index'

/**
 * VirtualListVirtualData接口定义
 */
export interface VirtualListVirtualData {
  /**
   * items
   * @type {any[]}
   */
  items: any[]

  /**
   * style
   * @type {string}
   */
  style: string
}

/**
 * VirtualListRenderPayload接口定义
 */
export interface VirtualListRenderPayload {
  /**
   * virtual
   * @type {VirtualListVirtualData}
   */
  virtual: VirtualListVirtualData

  /**
   * startIndex
   * @type {number}
   */
  startIndex: number

  /**
   * endIndex
   * @type {number}
   */
  endIndex: number

  /**
   * scrollOffset
   * @type {number}
   */
  scrollOffset: number

  /**
   * direction
   * @type {'Down' | 'Up'}
   */
  direction?: 'Down' | 'Up'
}

/**
 * VirtualListProps接口定义
 */
export interface VirtualListProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 每项高度
   *
   * @type {number}
   */
  itemHeight?: number

  /**
   * 渲染缓冲区项数
   *
   * @type {number}
   */
  itemBuffer?: number

  /**
   * 初始化滚动到的索引
   *
   * @type {number}
   */
  scrollToIndex?: number

  /**
   * 距顶部阈值
   *
   * @type {number}
   */
  upperThreshold?: number

  /**
   * 距底部阈值
   *
   * @type {number}
   */
  lowerThreshold?: number

  /**
   * 滚动是否使用动画
   *
   * @type {boolean}
   */
  scrollWithAnimation?: boolean

  /**
   * iOS 点击顶部状态栏是否返回顶部
   *
   * @type {boolean}
   */
  enableBackToTop?: boolean

  /**
   * 是否禁止滚动
   *
   * @type {boolean}
   */
  disableScroll?: boolean

  /**
   * 是否启用页面滚动模式
   *
   * @type {boolean}
   */
  enablePageScroll?: boolean

  /**
   * 容器高度
   *
   * @type {number}
   */
  height?: number

  /**
   * 滚动事件防抖延迟
   *
   * @type {number}
   */
  debounce?: number
}

/**
 * VirtualListExpose接口定义
 */
export interface VirtualListExpose {}

/**
 * VirtualListInstance类型定义
 */
export type VirtualListInstance = ComponentPublicInstance<VirtualList, VirtualListProps, VirtualListExpose>

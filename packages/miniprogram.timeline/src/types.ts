import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Timeline } from './index'
import type { TimelineItem } from './timeline-item'

/**
 * TimelinePosition类型定义
 */
export type TimelinePosition = 'left' | 'right' | 'alternate'

/**
 * TimelineItemUpdatePayload接口定义
 */
export interface TimelineItemUpdatePayload {
  /**
   * index
   * @type {number}
   */
  index: number

  /**
   * isLast
   * @type {boolean}
   */
  isLast: boolean

  /**
   * isPending
   * @type {boolean}
   */
  isPending: boolean

  /**
   * pending
   * @type {boolean}
   */
  pending: boolean

  /**
   * position
   * @type {string}
   */
  position: string
}

/**
 * TimelineProps接口定义
 */
export interface TimelineProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否显示 pending 节点
   *
   * @type {boolean}
   */
  pending?: boolean

  /**
   * 时间轴位置
   *
   * @type {TimelinePosition}
   */
  position?: TimelinePosition
}

/**
 * TimelineExpose接口定义
 */
export interface TimelineExpose {}

/**
 * TimelineItemProps接口定义
 */
export interface TimelineItemProps {
  /**
   * prefixCls
   * @type {string}
   */
  prefixCls?: string

  /**
   * content
   * @type {string}
   */
  content?: string

  /**
   * dotStyle
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  dotStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * custom
   * @type {boolean}
   */
  custom?: boolean
}

/**
 * TimelineItemExpose接口定义
 */
export interface TimelineItemExpose {}

/**
 * TimelineItemInternalMethods接口定义
 */
export interface TimelineItemInternalMethods {
  updateIsLastElement(payload: TimelineItemUpdatePayload): void
}

/**
 * TimelineItemInstance类型定义
 */
export type TimelineItemInstance = ComponentPublicInstance<TimelineItem, TimelineItemProps, TimelineItemExpose> &
  TimelineItemInternalMethods
/**
 * TimelineInstance类型定义
 */
export type TimelineInstance = ComponentPublicInstance<Timeline, TimelineProps, TimelineExpose>

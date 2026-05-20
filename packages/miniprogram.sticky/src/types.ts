import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Sticky } from './index'
import type { StickyItem } from './item'

export interface StickyItemProps {
  prefixCls?: string
  title?: string
  content?: string
}

export interface StickyItemExpose {
  onScroll(scrollTop: number): void
  updated(index: number): void
}

export type StickyItemInstance = ComponentPublicInstance<StickyItem, StickyItemProps, StickyItemExpose>

/**
 * StickyProps接口定义
 */
export interface StickyProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string

  /**
   * 页面滚动距离
   */
  scrollTop?: number
}

/**
 * StickyExpose接口定义
 */
export interface StickyExpose {
  onScroll(scrollTop?: number): void
  updated(): void
  emitStick(detail: { index: number }): { index: number }
  emitUnstick(detail: { index: number }): { index: number }
}

/**
 * StickyInstance类型定义
 */
export type StickyInstance = ComponentPublicInstance<Sticky, StickyProps, StickyExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Index } from './index'
import type { IndexItem } from './item'

/**
 * IndexIndicatorPosition类型定义
 */
export type IndexIndicatorPosition = 'left' | 'center' | 'right'

/**
 * IndexChild接口定义
 */
export interface IndexChild {
  /**
   * index
   * @type {number}
   */
  index: number

  /**
   * name
   * @type {string}
   */
  name: string

  /**
   * top
   * @type {number}
   */
  top: number

  /**
   * height
   * @type {number}
   */
  height: number

  /**
   * brief
   * @type {string}
   */
  brief: string
}

/**
 * IndexPointNode接口定义
 */
export interface IndexPointNode {
  /**
   * top
   * @type {number}
   */
  top: number

  /**
   * height
   * @type {number}
   */
  height: number

  /**
   * dataset
   * @type {{ index: number; name: string; brief: string }}
   */
  dataset: {
    index: number
    name: string
    brief: string
  }

  /**
   * offsets
   * @type {[number, number]}
   */
  offsets: [number, number]
}

/**
 * IndexItemExpose接口定义
 */
export interface IndexItemExpose {
  /**
   * 更新激活状态
   *
   * @return {void}
   */
  updated(index: number): void
}

/**
 * IndexItemProps接口定义
 */
export interface IndexItemProps {
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
 * IndexItemInternalMethods接口定义
 */
export interface IndexItemInternalMethods {
  /**
   * index
   * @type {number}
   */
  index: number

  /**
   * name
   * @type {string}
   */
  name: string

  /**
   * top
   * @type {number}
   */
  top: number

  /**
   * height
   * @type {number}
   */
  height: number

  /**
   * brief
   * @type {string}
   */
  brief: string
  updated(index: number): void
}

/**
 * IndexItemInstance类型定义
 */
export type IndexItemInstance = ComponentPublicInstance<IndexItem, IndexItemProps, IndexItemExpose> & IndexItemInternalMethods

/**
 * IndexProps接口定义
 */
export interface IndexProps {
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
   * @type {IndexIndicatorPosition}
   */
  indicatorPosition?: IndexIndicatorPosition

  /**
   * 父容器顶部偏移
   *
   * @type {number}
   */
  parentOffsetTop?: number
}

/**
 * IndexExpose接口定义
 */
export interface IndexExpose {
  /**
   * 滚动到指定项
   *
   * @return {void}
   */
  scrollTo(index: number | string): void

  /**
   * 获取内部 hooks
   *
   * @return {(null | { updateChildren: () => void })}
   */
  getInternalHooks(key: string): null | { updateChildren: () => void }
}

/**
 * IndexInstance类型定义
 */
export type IndexInstance = ComponentPublicInstance<Index, IndexProps, IndexExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Badge } from './index'

/**
 * BadgeStatus类型定义
 */
export type BadgeStatus = '' | 'success' | 'processing' | 'default' | 'error' | 'warning'
/**
 * BadgePosition类型定义
 */
export type BadgePosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'

/**
 * BadgeProps接口定义
 */
export interface BadgeProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * count
   * @type {number}
   */
  count?: number

  /**
   * overflowCount
   * @type {number}
   */
  overflowCount?: number

  /**
   * dot
   * @type {boolean}
   */
  dot?: boolean

  /**
   * showZero
   * @type {boolean}
   */
  showZero?: boolean

  /**
   * status
   * @type {BadgeStatus}
   */
  status?: BadgeStatus

  /**
   * text
   * @type {string}
   */
  text?: string

  /**
   * position
   * @type {BadgePosition}
   */
  position?: BadgePosition

  /**
   * backgroundColor
   * @type {string}
   */
  backgroundColor?: string

  /**
   * hideShadow
   * @type {boolean}
   */
  hideShadow?: boolean

  /**
   * title
   * @type {string}
   */
  title?: string
}

/**
 * BadgeExpose接口定义
 */
export interface BadgeExpose {}

/**
 * BadgeInstance类型定义
 */
export type BadgeInstance = ComponentPublicInstance<Badge, BadgeProps, BadgeExpose>

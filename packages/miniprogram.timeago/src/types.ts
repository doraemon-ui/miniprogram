import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Timeago } from './index'

/**
 * TimeagoLang类型定义
 */
export type TimeagoLang = 'zh_CN' | 'zh_TW' | 'en'

/**
 * TimeagoProps接口定义
 */
export interface TimeagoProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * to
   * @type {any}
   */
  to?: any

  /**
   * from
   * @type {any}
   */
  from?: any

  /**
   * refreshable
   * @type {boolean}
   */
  refreshable?: boolean

  /**
   * lang
   * @type {TimeagoLang}
   */
  lang?: TimeagoLang
}

/**
 * TimeagoExpose接口定义
 */
export interface TimeagoExpose {}

/**
 * TimeagoInstance类型定义
 */
export type TimeagoInstance = ComponentPublicInstance<Timeago, TimeagoProps, TimeagoExpose>

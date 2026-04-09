import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Result } from './index'

/**
 * ResultIcon接口定义
 */
export interface ResultIcon {
  /**
   * type
   * @type {string}
   */
  type: string

  /**
   * size
   * @type {number}
   */
  size: number

  /**
   * color
   * @type {string}
   */
  color: string
}

/**
 * ResultButton类型定义
 */
export type ResultButton = Partial<{
  type: string
  clear: boolean
  block: boolean
  full: boolean
  outline: boolean
  size: string
  disabled: boolean
  loading: boolean
  formType: string
  openType: string
  hoverStopPropagation: boolean
  hoverStartTime: number
  hoverStayTime: number
  lang: string
  sessionFrom: string
  sendMessageTitle: string
  sendMessagePath: string
  sendMessageImg: string
  showMessageCard: boolean
  appParameter: string
  text: string
}>

/**
 * ResultProps接口定义
 */
export interface ResultProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 图标配置
   *
   * @type {unknown}
   */
  icon?: unknown

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 描述
   *
   * @type {string}
   */
  label?: string

  /**
   * 底部按钮
   *
   * @type {ResultButton[]}
   */
  buttons?: ResultButton[]

  /**
   * 额外信息
   *
   * @type {string}
   */
  extra?: string

  /**
   * 是否固定底部
   *
   * @type {boolean}
   */
  fixed?: boolean
}

/**
 * ResultExpose接口定义
 */
export interface ResultExpose {}

/**
 * ResultInstance类型定义
 */
export type ResultInstance = ComponentPublicInstance<Result, ResultProps, ResultExpose>

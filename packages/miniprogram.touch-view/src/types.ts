import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { TouchView } from './index'

/**
 * TouchViewProps接口定义
 */
export interface TouchViewProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 点击态类名
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   *
   * @type {boolean}
   */
  hoverStopPropagation?: boolean

  /**
   * 按住后多久出现点击态，单位毫秒
   *
   * @type {number}
   */
  hoverStartTime?: number

  /**
   * 手指松开后点击态保留时间，单位毫秒
   *
   * @type {number}
   */
  hoverStayTime?: number

  /**
   * 外层样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  wrapStyle?: string | Partial<CSSStyleDeclaration>
}

/**
 * TouchViewExpose接口定义
 */
export interface TouchViewExpose {}

/**
 * TouchViewInstance类型定义
 */
export type TouchViewInstance = ComponentPublicInstance<TouchView, TouchViewProps, TouchViewExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Landscape } from './index'

/**
 * LandscapeCloseDetail接口定义
 */
export interface LandscapeCloseDetail {
  /**
   * visible
   * @type {boolean}
   */
  visible: boolean
}

/**
 * LandscapeProps接口定义
 */
export interface LandscapeProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否显示
   *
   * @type {boolean}
   */
  visible?: boolean

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   */
  mask?: boolean

  /**
   * 点击蒙层是否关闭
   *
   * @type {boolean}
   */
  maskClosable?: boolean

  /**
   * 是否显示关闭按钮
   *
   * @type {boolean}
   */
  closable?: boolean
}

/**
 * LandscapeExpose接口定义
 */
export interface LandscapeExpose {}

/**
 * LandscapeInstance类型定义
 */
export type LandscapeInstance = ComponentPublicInstance<Landscape, LandscapeProps, LandscapeExpose>

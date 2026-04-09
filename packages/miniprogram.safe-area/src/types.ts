import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { SafeArea } from './index'

/**
 * SafeAreaStyle类型定义
 */
export type SafeAreaStyle = 'default' | 'navBar' | 'statusBar'

/**
 * SafeAreaConfig接口定义
 */
export interface SafeAreaConfig {
  /**
   * top
   * @type {boolean}
   */
  top: boolean

  /**
   * bottom
   * @type {boolean}
   */
  bottom: boolean
}

/**
 * SafeAreaProp类型定义
 */
export type SafeAreaProp = boolean | 'top' | 'bottom' | SafeAreaConfig

/**
 * SafeAreaProps接口定义
 */
export interface SafeAreaProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否开启安全区适配
   *
   * @type {SafeAreaProp}
   */
  safeArea?: SafeAreaProp

  /**
   * 安全区范围样式
   *
   * @type {SafeAreaStyle}
   */
  safeAreaStyle?: SafeAreaStyle

  /**
   * 是否强制渲染安全区
   *
   * @type {boolean}
   */
  forceRender?: boolean

  /**
   * 是否使用 css @supports 适配安全区
   *
   * @type {boolean}
   */
  supports?: boolean

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>
}

/**
 * SafeAreaExpose接口定义
 */
export interface SafeAreaExpose {}

/**
 * SafeAreaInstance类型定义
 */
export type SafeAreaInstance = ComponentPublicInstance<SafeArea, SafeAreaProps, SafeAreaExpose>

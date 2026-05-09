import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Navbar } from './index'

/**
 * NavbarClickType类型定义
 */
export type NavbarClickType = 'left' | 'right'

/**
 * NavbarClickDetail接口定义
 */
export interface NavbarClickDetail {
  /**
   * type
   * @type {NavbarClickType}
   */
  type: NavbarClickType
}

/**
 * NavbarProps接口定义
 */
export interface NavbarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 主题
   *
   * @type {PresetColor}
   */
  color?: PresetColor

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 左侧文字
   *
   * @type {string}
   */
  leftText?: string

  /**
   * 右侧文字
   *
   * @type {string}
   */
  rightText?: string
}

/**
 * NavbarExpose接口定义
 */
export interface NavbarExpose {}

/**
 * NavbarInstance类型定义
 */
export type NavbarInstance = ComponentPublicInstance<Navbar, NavbarProps, NavbarExpose>

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Tabbar } from './index'
import type { TabbarItem } from './item'

/**
 * TabbarPosition类型定义
 */
export type TabbarPosition = '' | 'top' | 'bottom'
/**
 * TabbarSafeArea类型定义
 */
export type TabbarSafeArea = boolean | string | Record<string, unknown>

/**
 * TabbarKeyItem接口定义
 */
export interface TabbarKeyItem {
  /**
   * key
   * @type {string}
   */
  key: string

  /**
   * title
   * @type {string}
   */
  title: string

  /**
   * disabled
   * @type {boolean}
   */
  disabled: boolean
}

/**
 * TabbarChangeDetail接口定义
 */
export interface TabbarChangeDetail {
  /**
   * key
   * @type {string}
   */
  key: string

  /**
   * keys
   * @type {TabbarKeyItem[]}
   */
  keys: TabbarKeyItem[]
}

/**
 * TabbarProps接口定义
 */
export interface TabbarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * defaultCurrent
   * @type {string}
   */
  defaultCurrent?: string

  /**
   * current
   * @type {string}
   */
  current?: string

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * color
   * @type {PresetColor}
   */
  color?: PresetColor

  /**
   * backgroundColor
   * @type {string}
   */
  backgroundColor?: string

  /**
   * position
   * @type {TabbarPosition}
   */
  position?: TabbarPosition

  /**
   * safeArea
   * @type {TabbarSafeArea}
   */
  safeArea?: TabbarSafeArea
}

/**
 * TabbarExpose接口定义
 */
export interface TabbarExpose {
  /**
   * 设置当前激活项
   *
   * @return {void}
   */
  setActiveKey(activeKey: string): void
}

/**
 * TabbarItemProps接口定义
 */
export interface TabbarItemProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * key
   * @type {string}
   */
  key?: string

  /**
   * title
   * @type {string}
   */
  title?: string

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean
}

/**
 * TabbarItemExpose接口定义
 */
export interface TabbarItemExpose {
  changeCurrent(current: boolean, index: string, color: PresetColor, length: number): void
}

/**
 * TabbarItemInstance类型定义
 */
export type TabbarItemInstance = ComponentPublicInstance<TabbarItem, TabbarItemProps, TabbarItemExpose>
/**
 * TabbarInstance类型定义
 */
export type TabbarInstance = ComponentPublicInstance<Tabbar, TabbarProps, TabbarExpose>

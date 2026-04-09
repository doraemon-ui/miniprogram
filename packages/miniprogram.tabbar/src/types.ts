import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Tabbar } from './index'
import type { TabbarItem } from './tabbar-item'

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
   * theme
   * @type {string}
   */
  theme?: string

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
   * tabKey
   * @type {string}
   */
  tabKey?: string

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
export interface TabbarItemExpose {}

/**
 * TabbarItemInternalMethods接口定义
 */
export interface TabbarItemInternalMethods {
  changeCurrent(current: boolean, index: string, theme: string, length: number): void
}

/**
 * TabbarItemInstance类型定义
 */
export type TabbarItemInstance = ComponentPublicInstance<TabbarItem, TabbarItemProps, TabbarItemExpose> & TabbarItemInternalMethods
/**
 * TabbarInstance类型定义
 */
export type TabbarInstance = ComponentPublicInstance<Tabbar, TabbarProps, TabbarExpose>

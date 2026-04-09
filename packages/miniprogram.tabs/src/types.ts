import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Tabs } from './index'
import type { Tab } from './tab'

/**
 * TabsTheme类型定义
 */
export type TabsTheme = 'light' | 'stable' | 'positive' | 'calm' | 'assertive' | 'balanced' | 'energized' | 'royal' | 'dark'
/**
 * TabsDirection类型定义
 */
export type TabsDirection = 'horizontal' | 'vertical'
/**
 * ActiveLineMode类型定义
 */
export type ActiveLineMode = 'auto' | 'full'

/**
 * TabContext接口定义
 */
export interface TabContext {
  /**
   * scroll
   * @type {boolean}
   */
  scroll: boolean

  /**
   * theme
   * @type {TabsTheme}
   */
  theme: TabsTheme

  /**
   * direction
   * @type {TabsDirection}
   */
  direction: TabsDirection

  /**
   * activeLineMode
   * @type {ActiveLineMode}
   */
  activeLineMode: ActiveLineMode
}

/**
 * TabsKeyItem接口定义
 */
export interface TabsKeyItem {
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
 * TabsChangeDetail接口定义
 */
export interface TabsChangeDetail {
  /**
   * key
   * @type {string}
   */
  key: string

  /**
   * keys
   * @type {TabsKeyItem[]}
   */
  keys: TabsKeyItem[]
}

/**
 * TabProps接口定义
 */
export interface TabProps {
  /**
   * prefixCls
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
 * TabExpose接口定义
 */
export interface TabExpose {
  /**
   * 获取激活项位置信息
   *
   * @return {Promise<{ activeTabLeft: number; activeTabWidth: number; activeTabTop: number; activeTabHeight: number }>}
   */
  activeTabRef: () => Promise<{ activeTabLeft: number; activeTabWidth: number; activeTabTop: number; activeTabHeight: number }>

  /**
   * 更新激活状态
   *
   * @return {void}
   */
  changeCurrent: (payload: { current: boolean; context?: TabContext }) => void
}

/**
 * TabInstance类型定义
 */
export type TabInstance = ComponentPublicInstance<Tab, TabProps, TabExpose>

/**
 * TabsProps接口定义
 */
export interface TabsProps {
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
   * scroll
   * @type {boolean}
   */
  scroll?: boolean

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * theme
   * @type {TabsTheme}
   */
  theme?: TabsTheme

  /**
   * direction
   * @type {TabsDirection}
   */
  direction?: TabsDirection

  /**
   * justify
   * @type {string}
   */
  justify?: string

  /**
   * activeLineMode
   * @type {ActiveLineMode}
   */
  activeLineMode?: ActiveLineMode
}

/**
 * TabsExpose接口定义
 */
export interface TabsExpose {
  /**
   * 设置当前激活项
   *
   * @return {void}
   */
  setActiveKey(activeKey: string): void
}

/**
 * TabsInstance类型定义
 */
export type TabsInstance = ComponentPublicInstance<Tabs, TabsProps, TabsExpose>

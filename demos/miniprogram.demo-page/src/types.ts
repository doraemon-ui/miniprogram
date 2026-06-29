import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { DarkMode } from '@doraemon-ui/miniprogram.shared'

import type { DemoPage } from './index'

export type SysTheme = Exclude<DarkMode, 'auto'>

export interface PresetTheme {
  /**
   * 窗口的背景色
   */
  backgroundColor: string
  /**
   * 下拉 loading 的样式，仅支持 dark / light
   */
  backgroundTextStyle: SysTheme
  /**
   * 导航栏背景颜色，如 #000000
   */
  navigationBarBackgroundColor: string
  /**
   * 导航栏标题、状态栏颜色，仅支持 black / white
   */
  navigationBarTextStyle: 'black' | 'white'
}

/**
 * DemoPage props
 */
export interface DemoPageProps {
  prefixCls?: string
  darkmode?: DarkMode
  clickable?: boolean
  spacing?: boolean
  title?: string
  desc?: string
}

/**
 * DemoPage exposed
 */
export interface DemoPageExpose {
  isAuto?: boolean
  isManual?: boolean
  onIconClick?: () => void
}

export type DemoPageInstance = ComponentPublicInstance<DemoPage, DemoPageProps, DemoPageExpose>

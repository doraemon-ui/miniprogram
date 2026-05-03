import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { DarkMode } from '@doraemon-ui/miniprogram.shared'

import type { DemoPage } from './index'

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

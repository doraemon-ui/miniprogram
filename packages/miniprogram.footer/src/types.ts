import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { NativeRouteOpenType, PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Footer } from './index'

export interface FooterLinkItem {
  text: string
  url?: string
  openType?: NativeRouteOpenType
  delta?: number
  urlParams?: Record<string, any>
}

export interface FooterChipItem {
  text: string
  type?: 'default' | 'link'
}

export interface FooterLinkClickDetail {
  item: FooterLinkItem
  index: number
}

export interface FooterChipClickDetail {
  item: FooterChipItem
  index: number
}

export interface FooterProps {
  prefixCls?: string
  color?: PresetColor
  label?: string
  content?: string
  links?: FooterLinkItem[]
  chips?: FooterChipItem[]
}

export interface FooterExpose {}

export type FooterInstance = ComponentPublicInstance<Footer, FooterProps, FooterExpose>

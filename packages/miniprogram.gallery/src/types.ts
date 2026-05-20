import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

import type { Gallery } from './index'

export interface GalleryItem {
  image: string
  remark?: string
}

export type GalleryImage = GalleryItem & {
  touch: {
    scale: number
    offset: [number, number]
  }
}

export type GalleryShowProps = Omit<GalleryProps, 'visible'> & GalleryExpose

export interface GalleryShowOptions {
  selector?: string
  instance?: MiniprogramPublicInstance
}

export interface GalleryProps {
  prefixCls?: string
  visible?: boolean
  current?: number
  urls?: Array<string | GalleryItem>
  classNames?: string
  indicatorDots?: boolean
  indicatorColor?: string
  indicatorActiveColor?: string
  autoplay?: boolean
  interval?: number
  duration?: number
  circular?: boolean
  vertical?: boolean
  showDelete?: boolean
  allowScale?: boolean
  icon?: string
}

export interface GalleryExpose {
  onDelete?: (current: number, urls: Array<string | GalleryItem>) => boolean | void
  onClick?: (current: number, urls: Array<string | GalleryItem>) => boolean | void
  onChange?: (detail: { current: number; source: string }) => void
  onCancel?: () => void
  onClose?: () => void
  onClosed?: () => void
}

export type GalleryInstance = ComponentPublicInstance<Gallery, GalleryProps, GalleryExpose>

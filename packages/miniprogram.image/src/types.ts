import type { ComponentPublicInstance, CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'

import type { Image } from './index'

/**
 * SemanticName类型定义
 *
 * - root: 根元素，设置容器样式和布局
 * - thumb: 图片元素，设置图片样式
 */
export type SemanticName = 'root' | 'thumb'

export type ImageStatus = 'empty' | 'loading' | 'loaded' | 'error' | 'unmounted'

export type ImageShape = 'normal' | 'rounded' | 'circle' | 'thumbnail'

export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export interface ImageProps {
  prefixCls?: string
  rootClassName?: string
  rootStyle?: string | Partial<CSSStylePropertiesWithVars>
  classNames?: Partial<Record<SemanticName, string>>
  styles?: Partial<Record<SemanticName, CSSStylePropertiesWithVars | string>>
  src?: string
  mode?: ImageMode
  webp?: boolean
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
  shape?: ImageShape
  width?: string | number
  height?: string | number
  unmountOnEmpty?: boolean
  unmountOnError?: boolean
  empty?: string
  loading?: string
  error?: string
}

export interface ImageExpose {}

export type ImageInstance = ComponentPublicInstance<Image, ImageProps, ImageExpose>

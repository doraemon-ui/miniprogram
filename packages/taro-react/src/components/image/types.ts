import type { ImageExpose as NativeImageExpose, ImageProps as NativeImageProps } from '@doraemon-ui/miniprogram.image'

import type { BasicComponent } from '../../types'

export interface ImageProps extends NativeImageProps, BasicComponent {
  onChange?: (event: any) => void
  onLoad?: (event: any) => void
  onError?: (event: any) => void
  onClick?: (event: any) => void
}

export interface ImageExpose extends NativeImageExpose {}

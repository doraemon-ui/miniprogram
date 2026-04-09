import type { ImageProps as NativeImageProps, ImageExpose as NativeImageExpose } from '@doraemon-ui/miniprogram.image'
import type { BasicComponent } from '@/types'

export interface ImageProps extends NativeImageProps, BasicComponent {}

export interface ImageExpose extends NativeImageExpose {}

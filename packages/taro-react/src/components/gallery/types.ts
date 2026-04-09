import type { GalleryProps as NativeGalleryProps, GalleryExpose as NativeGalleryExpose } from '@doraemon-ui/miniprogram.gallery'
import type { BasicComponent } from '@/types'

export interface GalleryProps extends NativeGalleryProps, BasicComponent {}

export interface GalleryExpose extends NativeGalleryExpose {}

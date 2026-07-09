import type { GalleryExpose as NativeGalleryExpose, GalleryProps as NativeGalleryProps } from '@doraemon-ui/miniprogram.gallery'

import type { BasicComponent } from '../../types'

export interface GalleryProps extends NativeGalleryProps, BasicComponent {
  onCancel?: (event: any) => void
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
  onClick?: (event: any) => void
  onDelete?: (event: any) => void
  onChange?: (event: any) => void
}

export interface GalleryExpose extends NativeGalleryExpose {}

import { createHostComponent } from '../../hooks/hostComponent'
import type { GalleryProps, GalleryExpose } from './types'

export const Gallery = createHostComponent<GalleryProps, GalleryExpose>('dora-gallery',
{
  prefixCls: 'dora-gallery',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Gallery.displayName = 'DoraGallery'

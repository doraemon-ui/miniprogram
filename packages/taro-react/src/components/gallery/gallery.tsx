import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { GalleryProps, GalleryExpose } from './types'

export const Gallery = createHostComponent<GalleryProps, GalleryExpose>('dora-gallery')

Gallery.displayName = 'DoraGallery'

// Props registry for Taro WXML template generator
React.createElement('dora-gallery', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})

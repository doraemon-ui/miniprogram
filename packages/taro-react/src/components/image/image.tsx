import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ImageProps, ImageExpose } from './types'

export const Image = createHostComponent<ImageProps, ImageExpose>('dora-image')

Image.displayName = 'DoraImage'

// Props registry for Taro WXML template generator
React.createElement('dora-image', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})

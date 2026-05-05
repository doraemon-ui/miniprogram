import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { MediaProps, MediaExpose } from './types'

export const Media = createHostComponent<MediaProps, MediaExpose>('dora-media')

Media.displayName = 'DoraMedia'

// Props registry for Taro WXML template generator
React.createElement('dora-media', {
  prefixCls: '',
  thumb: '',
  thumbStyle: null,
  title: '',
  label: '',
  align: '',
})

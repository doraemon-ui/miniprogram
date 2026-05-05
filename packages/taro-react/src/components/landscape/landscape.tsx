import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { LandscapeProps, LandscapeExpose } from './types'

export const Landscape = createHostComponent<LandscapeProps, LandscapeExpose>('dora-landscape')

Landscape.displayName = 'DoraLandscape'

// Props registry for Taro WXML template generator
React.createElement('dora-landscape', {
  prefixCls: '',
  visible: false,
  mask: false,
  maskClosable: false,
  closable: false,
  onClose: undefined,
})

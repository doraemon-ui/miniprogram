import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { WingBlankProps, WingBlankExpose } from './types'

export const WingBlank = createHostComponent<WingBlankProps, WingBlankExpose>('dora-wing-blank')

WingBlank.displayName = 'DoraWingBlank'

// Props registry for Taro WXML template generator
React.createElement('dora-wing-blank', {
  prefixCls: '',
  size: '',
  bodyStyle: null,
})

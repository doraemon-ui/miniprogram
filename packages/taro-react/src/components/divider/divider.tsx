import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { DividerProps, DividerExpose } from './types'

export const Divider = createHostComponent<DividerProps, DividerExpose>('dora-divider')

Divider.displayName = 'DoraDivider'

// Props registry for Taro WXML template generator
React.createElement('dora-divider', {
  prefixCls: '',
  position: '',
  dashed: false,
  text: '',
  showText: false,
  direction: '',
})

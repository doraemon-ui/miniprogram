import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FilterbarProps, FilterbarExpose } from './types'

export const Filterbar = createHostComponent<FilterbarProps, FilterbarExpose>('dora-filterbar')

Filterbar.displayName = 'DoraFilterbar'

// Props registry for Taro WXML template generator
React.createElement('dora-filterbar', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})

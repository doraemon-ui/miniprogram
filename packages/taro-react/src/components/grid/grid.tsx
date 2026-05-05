import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { GridProps, GridExpose } from './types'

export const Grid = createHostComponent<GridProps, GridExpose>('dora-grid')

Grid.displayName = 'DoraGrid'

// Props registry for Taro WXML template generator
React.createElement('dora-grid', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})

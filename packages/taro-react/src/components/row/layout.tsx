import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { RowProps, RowExpose } from './types'

export const Row = createHostComponent<RowProps, RowExpose>('dora-row')

Row.displayName = 'DoraRow'

// Props registry for Taro WXML template generator
React.createElement('dora-row', {
  prefixCls: '',
  gutter: 0,
})

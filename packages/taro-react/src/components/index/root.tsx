import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { IndexProps, IndexExpose } from './types'

export const Index = createHostComponent<IndexProps, IndexExpose>('dora-index')

Index.displayName = 'DoraIndex'

// Props registry for Taro WXML template generator
React.createElement('dora-index', {
  prefixCls: '',
  height: '',
  showIndicator: false,
  indicatorPosition: '',
  parentOffsetTop: 0,
  onChange: undefined,
})

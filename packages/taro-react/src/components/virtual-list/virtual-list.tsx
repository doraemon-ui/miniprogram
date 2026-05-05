import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { VirtualListProps, VirtualListExpose } from './types'

export const VirtualList = createHostComponent<VirtualListProps, VirtualListExpose>('dora-virtual-list')

VirtualList.displayName = 'DoraVirtualList'

// Props registry for Taro WXML template generator
React.createElement('dora-virtual-list', {
  prefixCls: '',
  itemHeight: 0,
  itemBuffer: 0,
  scrollToIndex: 0,
  upperThreshold: 0,
  lowerThreshold: 0,
  scrollWithAnimation: false,
  enableBackToTop: false,
  disableScroll: false,
  enablePageScroll: false,
  height: 0,
  debounce: 0,
  onChange: undefined,
  onScroll: undefined,
  onScrolltoupper: undefined,
  onScrolltolower: undefined,
})

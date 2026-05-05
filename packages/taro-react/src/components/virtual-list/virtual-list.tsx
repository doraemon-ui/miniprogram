import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { VirtualListProps, VirtualListExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const VirtualList = createHostComponent<VirtualListProps, VirtualListExpose>('dora-virtual-list',
{
  prefixCls: 'dora-virtual-list',
  itemHeight: 50,
  itemBuffer: 0,
  scrollToIndex: 0,
  upperThreshold: 50,
  lowerThreshold: 50,
  scrollWithAnimation: false,
  enableBackToTop: false,
  disableScroll: false,
  enablePageScroll: false,
  height: 300,
  debounce: 0,
})

VirtualList.displayName = 'DoraVirtualList'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-virtual-list', {
  prefixCls: '',
  itemHeight: '',
  itemBuffer: '',
  scrollToIndex: '',
  upperThreshold: '',
  lowerThreshold: '',
  scrollWithAnimation: '',
  enableBackToTop: '',
  disableScroll: '',
  enablePageScroll: '',
  height: '',
  debounce: '',
  onChange: '',
  onScroll: '',
  onScrolltoupper: '',
  onScrolltolower: '',
})

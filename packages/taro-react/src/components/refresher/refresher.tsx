import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { RefresherProps, RefresherExpose } from './types'

export const Refresher = createHostComponent<RefresherProps, RefresherExpose>('dora-refresher')

Refresher.displayName = 'DoraRefresher'

// Props registry for Taro WXML template generator
React.createElement('dora-refresher', {
  prefixCls: '',
  pullingIcon: '',
  pullingText: '',
  refreshingIcon: '',
  refreshingText: '',
  disablePullingRotation: false,
  distance: 0,
  prefixLCls: '',
  isShowLoadingText: false,
  loadingText: '',
  loadNoDataText: '',
  scrollTop: 0,
  onPulling: undefined,
  onRefresh: undefined,
  onLoadmore: undefined,
})

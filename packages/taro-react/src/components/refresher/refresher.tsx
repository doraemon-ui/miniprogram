import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { RefresherProps, RefresherExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Refresher = createHostComponent<RefresherProps, RefresherExpose>('dora-refresher',
{
  prefixCls: 'dora-refresher',
  pullingIcon: '',
  pullingText: '下拉刷新',
  refreshingIcon: '',
  refreshingText: '正在刷新',
  disablePullingRotation: false,
  distance: 30,
  prefixLCls: 'dora-loader',
  isShowLoadingText: false,
  loadingText: '正在加载',
  loadNoDataText: '没有更多数据',
  scrollTop: 0,
})

Refresher.displayName = 'DoraRefresher'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-refresher', {
  prefixCls: '',
  pullingIcon: '',
  pullingText: '',
  refreshingIcon: '',
  refreshingText: '',
  disablePullingRotation: '',
  distance: '',
  prefixLCls: '',
  isShowLoadingText: '',
  loadingText: '',
  loadNoDataText: '',
  scrollTop: '',
  onPulling: '',
  onRefresh: '',
  onLoadmore: '',
})

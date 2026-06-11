import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { IndexListProps, IndexListExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const IndexList = createHostComponent<IndexListProps, IndexListExpose>('dora-index-list',
{
  prefixCls: 'dora-index-list',
  height: 300,
  showIndicator: true,
  indicatorPosition: 'center',
  parentOffsetTop: 0,
})

IndexList.displayName = 'DoraIndexList'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-index-list', {
  prefixCls: '',
  height: '',
  showIndicator: '',
  indicatorPosition: '',
  parentOffsetTop: '',
  onChange: '',
})

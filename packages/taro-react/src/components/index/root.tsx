import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { IndexProps, IndexExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Index = createHostComponent<IndexProps, IndexExpose>('dora-index',
{
  prefixCls: 'dora-index',
  height: 300,
  showIndicator: true,
  indicatorPosition: 'center',
  parentOffsetTop: 0,
})

Index.displayName = 'DoraIndex'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-index', {
  prefixCls: '',
  height: '',
  showIndicator: '',
  indicatorPosition: '',
  parentOffsetTop: '',
  onChange: '',
})

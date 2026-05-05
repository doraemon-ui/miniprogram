import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { IndexItemProps, IndexItemExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const IndexItem = createHostComponent<IndexItemProps, IndexItemExpose>('dora-index-item',
{
  prefixCls: 'dora-index-item',
  name: '',
})

IndexItem.displayName = 'DoraIndexItem'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-index-item', {
  prefixCls: '',
  name: '',
})

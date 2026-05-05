import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { RowProps, RowExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Row = createHostComponent<RowProps, RowExpose>('dora-row',
{
  prefixCls: 'dora-row',
  gutter: 0,
})

Row.displayName = 'DoraRow'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-row', {
  prefixCls: '',
  gutter: '',
})

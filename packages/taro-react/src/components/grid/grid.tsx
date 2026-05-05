import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { GridProps, GridExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Grid = createHostComponent<GridProps, GridExpose>('dora-grid',
{
  prefixCls: 'dora-grid',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Grid.displayName = 'DoraGrid'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-grid', {
  prefixCls: '',
  disabled: '',
  hoverClass: '',
  wrapStyle: '',
  onClick: '',
})

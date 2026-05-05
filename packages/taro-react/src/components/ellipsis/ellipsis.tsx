import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { EllipsisProps, EllipsisExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Ellipsis = createHostComponent<EllipsisProps, EllipsisExpose>('dora-ellipsis',
{
  prefixCls: 'dora-ellipsis',
  content: '',
  direction: 'end',
  defaultExpanded: false,
  expandText: '',
  collapseText: '',
  rows: 1,
})

Ellipsis.displayName = 'DoraEllipsis'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-ellipsis', {
  prefixCls: '',
  content: '',
  direction: '',
  defaultExpanded: '',
  expandText: '',
  collapseText: '',
  rows: '',
  onClick: '',
})

import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TimeagoProps, TimeagoExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Timeago = createHostComponent<TimeagoProps, TimeagoExpose>('dora-timeago',
{
  prefixCls: 'dora-timeago',
  to: null,
  from: null,
  refreshable: false,
  lang: 'zh_CN',
})

Timeago.displayName = 'DoraTimeago'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-timeago', {
  prefixCls: '',
  to: '',
  from: '',
  refreshable: '',
  lang: '',
})

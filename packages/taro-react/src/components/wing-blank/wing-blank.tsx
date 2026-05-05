import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { WingBlankProps, WingBlankExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const WingBlank = createHostComponent<WingBlankProps, WingBlankExpose>('dora-wing-blank',
{
  prefixCls: 'dora-wing-blank',
  size: 'default',
  bodyStyle: null,
})

WingBlank.displayName = 'DoraWingBlank'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-wing-blank', {
  prefixCls: '',
  size: '',
  bodyStyle: '',
})

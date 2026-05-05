import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SwitchProps, SwitchExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Switch = createHostComponent<SwitchProps, SwitchExpose>('dora-switch',
{
  prefixCls: 'dora-switch',
  value: false,
  disabled: false,
  loading: false,
  color: 'balanced',
  checkedText: '',
  uncheckedText: '',
})

Switch.displayName = 'DoraSwitch'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-switch', {
  prefixCls: '',
  value: '',
  disabled: '',
  loading: '',
  color: '',
  checkedText: '',
  uncheckedText: '',
  onChange: '',
})

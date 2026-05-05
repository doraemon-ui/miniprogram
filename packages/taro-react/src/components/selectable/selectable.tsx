import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SelectableProps, SelectableExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Selectable = createHostComponent<SelectableProps, SelectableExpose>('dora-selectable',
{
  prefixCls: 'dora-selectable',
  type: 'checkbox',
  value: '',
  defaultChecked: false,
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  controlled: false,
  wrapStyle: null,
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

Selectable.displayName = 'DoraSelectable'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-selectable', {
  prefixCls: '',
  type: '',
  value: '',
  defaultChecked: '',
  checked: '',
  disabled: '',
  readOnly: '',
  color: '',
  controlled: '',
  wrapStyle: '',
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: '',
})

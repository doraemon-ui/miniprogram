import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CheckboxProps, CheckboxExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Checkbox = createHostComponent<CheckboxProps, CheckboxExpose>('dora-checkbox',
{
  prefixCls: 'dora-checkbox',
  cellPrefixCls: 'dora-list-item',
  selectablePrefixCls: 'dora-selectable',
  title: '',
  label: '',
  extra: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  wrapStyle: null,
  hasLine: true,
})

Checkbox.displayName = 'DoraCheckbox'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-checkbox', {
  prefixCls: '',
  cellPrefixCls: '',
  selectablePrefixCls: '',
  title: '',
  label: '',
  extra: '',
  value: '',
  checked: '',
  disabled: '',
  readOnly: '',
  color: '',
  wrapStyle: '',
  hasLine: '',
  onChange: '',
})

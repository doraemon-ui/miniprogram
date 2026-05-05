import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { RadioGroupProps, RadioGroupExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const RadioGroup = createHostComponent<RadioGroupProps, RadioGroupExpose>('dora-radio-group',
{
  prefixCls: 'dora-radio-group',
  cellGroupPrefixCls: 'dora-list',
  value: '',
  name: '',
  title: '',
  label: '',
  options: [],
  disabled: false,
  readOnly: false,
  mode: 'default',
  bodyStyle: null,
  hasLine: true,
  withListComponent: true,
  iconPosition: 'right',
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

RadioGroup.displayName = 'DoraRadioGroup'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-radio-group', {
  prefixCls: '',
  cellGroupPrefixCls: '',
  value: '',
  name: '',
  title: '',
  label: '',
  options: '',
  disabled: '',
  readOnly: '',
  mode: '',
  bodyStyle: '',
  hasLine: '',
  withListComponent: '',
  iconPosition: '',
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: '',
})

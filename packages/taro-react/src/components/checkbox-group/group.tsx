import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CheckboxGroupProps, CheckboxGroupExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const CheckboxGroup = createHostComponent<CheckboxGroupProps, CheckboxGroupExpose>('dora-checkbox-group',
{
  prefixCls: 'dora-checkbox-group',
  cellGroupPrefixCls: 'dora-list',
  value: [],
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
  iconPosition: 'left',
  iconSize: '',
  iconOn: '',
  iconOff: '',
})

CheckboxGroup.displayName = 'DoraCheckboxGroup'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-checkbox-group', {
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

import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { RadioProps, RadioExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Radio = createHostComponent<RadioProps, RadioExpose>('dora-radio',
{
  prefixCls: 'dora-radio',
  cellPrefixCls: 'dora-list-item',
  selectablePrefixCls: 'dora-selectable',
  thumb: '',
  title: '',
  label: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: 'balanced',
  wrapStyle: null,
  hasLine: true,
})

Radio.displayName = 'DoraRadio'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-radio', {
  prefixCls: '',
  cellPrefixCls: '',
  selectablePrefixCls: '',
  thumb: '',
  title: '',
  label: '',
  value: '',
  checked: '',
  disabled: '',
  readOnly: '',
  color: '',
  wrapStyle: '',
  hasLine: '',
})

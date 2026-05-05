import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { InputNumberProps, InputNumberExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const InputNumber = createHostComponent<InputNumberProps, InputNumberExpose>('dora-input-number',
{
  prefixCls: 'dora-input-number',
  shape: 'square',
  min: 0,
  max: 0,
  step: 1,
  defaultValue: 0,
  value: 0,
  disabled: true,
  readOnly: false,
  longpress: false,
  color: 'balanced',
  controlled: false,
  digits: -1,
})

InputNumber.displayName = 'DoraInputNumber'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-input-number', {
  prefixCls: '',
  shape: '',
  min: '',
  max: '',
  step: '',
  defaultValue: '',
  value: '',
  disabled: '',
  readOnly: '',
  longpress: '',
  color: '',
  controlled: '',
  digits: '',
  onChange: '',
  onFocus: '',
  onBlur: '',
})

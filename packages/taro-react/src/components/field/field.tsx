import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { FieldProps, FieldExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Field = createHostComponent<FieldProps, FieldExpose>('dora-field',
{
  prefixCls: 'dora-field',
  initialValue: null,
  valuePropName: 'inputValue',
  trigger: 'onChange',
  validate: [],
  validateTrigger: 'onChange',
  preserve: false,
  rules: [],
  validateFirst: false,
  hidden: false,
  childElementPosition: 'none',
  cellPrefixCls: 'dora-list-item',
  label: '',
  labelWrap: false,
  extra: '',
  isLink: false,
  align: 'flex-start',
  disabled: false,
  readOnly: false,
  validateStatus: null,
  required: null,
  help: null,
  hasFeedback: true,
  name: '',
  value: '',
})

Field.displayName = 'DoraField'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-field', {
  prefixCls: '',
  initialValue: '',
  valuePropName: '',
  trigger: '',
  validate: '',
  validateTrigger: '',
  preserve: '',
  rules: '',
  validateFirst: '',
  hidden: '',
  childElementPosition: '',
  cellPrefixCls: '',
  label: '',
  labelWrap: '',
  extra: '',
  isLink: '',
  align: '',
  disabled: '',
  readOnly: '',
  validateStatus: '',
  required: '',
  help: '',
  hasFeedback: '',
  name: '',
  value: '',
})

import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { FormProps, FormExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Form = createHostComponent<FormProps, FormExpose>('dora-form',
{
  prefixCls: 'dora-form',
  cellGroupPrefixCls: 'dora-list',
  title: '',
  label: '',
  mode: 'default',
  bodyStyle: '',
  layout: 'none',
  validateMessages: null,
  requiredMarkStyle: 'asterisk',
  asteriskText: '*',
  requiredText: '必填',
  optionalText: '选填',
  disabled: false,
  readOnly: false,
})

Form.displayName = 'DoraForm'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-form', {
  prefixCls: '',
  cellGroupPrefixCls: '',
  title: '',
  label: '',
  mode: '',
  bodyStyle: '',
  layout: '',
  validateMessages: '',
  requiredMarkStyle: '',
  asteriskText: '',
  requiredText: '',
  optionalText: '',
  disabled: '',
  readOnly: '',
  onChange: '',
  onFieldsChange: '',
})

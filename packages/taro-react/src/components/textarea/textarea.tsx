import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TextareaProps, TextareaExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Textarea = createHostComponent<TextareaProps, TextareaExpose>('dora-textarea',
{
  prefixCls: 'dora-textarea',
  label: '',
  extra: '',
  defaultValue: '',
  value: '',
  controlled: false,
  disabled: false,
  readOnly: false,
  rows: 1,
  hasCount: false,
  clear: false,
  error: false,
  placeholderStyle: null,
})

Textarea.displayName = 'DoraTextarea'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-textarea', {
  prefixCls: '',
  label: '',
  extra: '',
  defaultValue: '',
  value: '',
  controlled: '',
  disabled: '',
  readOnly: '',
  rows: '',
  hasCount: '',
  clear: '',
  error: '',
  placeholderStyle: '',
  onChange: '',
  onFocus: '',
  onBlur: '',
  onConfirm: '',
  onKeyboardheightchange: '',
  onClear: '',
  onError: '',
  onLinechange: '',
})

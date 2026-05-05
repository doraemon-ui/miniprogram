import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TextareaProps, TextareaExpose } from './types'

export const Textarea = createHostComponent<TextareaProps, TextareaExpose>('dora-textarea')

Textarea.displayName = 'DoraTextarea'

// Props registry for Taro WXML template generator
React.createElement('dora-textarea', {
  prefixCls: '',
  label: '',
  extra: '',
  defaultValue: '',
  value: '',
  controlled: false,
  disabled: false,
  readOnly: false,
  rows: 0,
  hasCount: false,
  clear: false,
  error: false,
  placeholderStyle: null,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onKeyboardheightchange: undefined,
  onClear: undefined,
  onError: undefined,
  onLinechange: undefined,
})

import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CheckboxProps, CheckboxExpose } from './types'

export const Checkbox = createHostComponent<CheckboxProps, CheckboxExpose>('dora-checkbox')

Checkbox.displayName = 'DoraCheckbox'

// Props registry for Taro WXML template generator
React.createElement('dora-checkbox', {
  prefixCls: '',
  cellPrefixCls: '',
  selectablePrefixCls: '',
  title: '',
  label: '',
  extra: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: '',
  wrapStyle: null,
  hasLine: false,
  onChange: undefined,
})

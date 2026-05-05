import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { InputNumberProps, InputNumberExpose } from './types'

export const InputNumber = createHostComponent<InputNumberProps, InputNumberExpose>('dora-input-number')

InputNumber.displayName = 'DoraInputNumber'

// Props registry for Taro WXML template generator
React.createElement('dora-input-number', {
  prefixCls: '',
  shape: '',
  min: 0,
  max: 0,
  step: 0,
  defaultValue: 0,
  value: 0,
  disabled: false,
  readOnly: false,
  longpress: false,
  color: '',
  controlled: false,
  digits: 0,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
})

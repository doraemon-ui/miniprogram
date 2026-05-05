import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { RadioGroupProps, RadioGroupExpose } from './types'

export const RadioGroup = createHostComponent<RadioGroupProps, RadioGroupExpose>('dora-radio-group')

RadioGroup.displayName = 'DoraRadioGroup'

// Props registry for Taro WXML template generator
React.createElement('dora-radio-group', {
  prefixCls: '',
  cellGroupPrefixCls: '',
  value: '',
  name: '',
  title: '',
  label: '',
  options: [],
  disabled: false,
  readOnly: false,
  mode: '',
  bodyStyle: null,
  hasLine: false,
  withListComponent: false,
  iconPosition: '',
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: undefined,
})

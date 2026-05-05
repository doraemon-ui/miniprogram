import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CheckboxGroupProps, CheckboxGroupExpose } from './types'

export const CheckboxGroup = createHostComponent<CheckboxGroupProps, CheckboxGroupExpose>('dora-checkbox-group')

CheckboxGroup.displayName = 'DoraCheckboxGroup'

// Props registry for Taro WXML template generator
React.createElement('dora-checkbox-group', {
  prefixCls: '',
  cellGroupPrefixCls: '',
  value: [],
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

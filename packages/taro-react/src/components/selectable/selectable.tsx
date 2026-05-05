import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectableProps, SelectableExpose } from './types'

export const Selectable = createHostComponent<SelectableProps, SelectableExpose>('dora-selectable')

Selectable.displayName = 'DoraSelectable'

// Props registry for Taro WXML template generator
React.createElement('dora-selectable', {
  prefixCls: '',
  type: '',
  value: '',
  defaultChecked: false,
  checked: false,
  disabled: false,
  readOnly: false,
  color: '',
  controlled: false,
  wrapStyle: null,
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: undefined,
})

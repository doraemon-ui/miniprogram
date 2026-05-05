import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectProps, SelectExpose } from './types'

export const Select = createHostComponent<SelectProps, SelectExpose>('dora-select')

Select.displayName = 'DoraSelect'

// Props registry for Taro WXML template generator
React.createElement('dora-select', {
  prefixCls: '',
  value: [],
  options: [],
  multiple: false,
  max: 0,
  notFoundContent: '',
  virtualized: false,
  toolbar: '',
})

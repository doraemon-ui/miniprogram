import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectorGroupProps, SelectorGroupExpose } from './types'

export const SelectorGroup = createHostComponent<SelectorGroupProps, SelectorGroupExpose>('dora-selector-group')

SelectorGroup.displayName = 'DoraSelectorGroup'

// Props registry for Taro WXML template generator
React.createElement('dora-selector-group', {
  prefixCls: '',
  theme: '',
  shape: '',
  columns: 0,
  gap: 0,
  options: [],
  defaultValue: [],
  value: [],
  controlled: false,
  multiple: false,
  showCheckMark: false,
  defaultFieldNames: '',
  onChange: undefined,
})

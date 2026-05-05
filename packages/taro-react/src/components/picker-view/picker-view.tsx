import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PickerViewProps, PickerViewExpose } from './types'

export const PickerView = createHostComponent<PickerViewProps, PickerViewExpose>('dora-picker-view')

PickerView.displayName = 'DoraPickerView'

// Props registry for Taro WXML template generator
React.createElement('dora-picker-view', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: false,
  itemHeight: 0,
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: '',
  loading: false,
  options: [],
  defaultFieldNames: '',
  onValueChange: undefined,
  onBeforeChange: undefined,
})

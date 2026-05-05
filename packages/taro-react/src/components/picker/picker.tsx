import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PickerProps, PickerExpose } from './types'

export const Picker = createHostComponent<PickerProps, PickerExpose>('dora-picker')

Picker.displayName = 'DoraPicker'

// Props registry for Taro WXML template generator
React.createElement('dora-picker', {
  prefixCls: '',
  multiPickerPrefixCls: '',
  pickerPrefixCls: '',
  toolbar: '',
  defaultVisible: false,
  visible: false,
  controlled: false,
  disabled: false,
  cascade: false,
  cols: 0,
  value: [],
  options: [],
  loading: false,
  itemHeight: 0,
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: '',
  defaultFieldNames: '',
  onVisibleChange: undefined,
  onChange: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onValueChange: undefined,
})

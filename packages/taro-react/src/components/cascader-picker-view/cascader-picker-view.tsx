import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderPickerViewProps, CascaderPickerViewExpose } from './types'

export const CascaderPickerView = createHostComponent<CascaderPickerViewProps, CascaderPickerViewExpose>('dora-cascader-picker-view')

CascaderPickerView.displayName = 'DoraCascaderPickerView'

// Props registry for Taro WXML template generator
React.createElement('dora-cascader-picker-view', {
  prefixCls: '',
  pickerPrefixCls: '',
  value: [],
  cols: 0,
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
})

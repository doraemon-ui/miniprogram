import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { DatePickerViewProps, DatePickerViewExpose } from './types'

export const DatePickerView = createHostComponent<DatePickerViewProps, DatePickerViewExpose>('dora-date-picker-view')

DatePickerView.displayName = 'DoraDatePickerView'

// Props registry for Taro WXML template generator
React.createElement('dora-date-picker-view', {
  prefixCls: '',
  multiPickerPrefixCls: '',
  pickerPrefixCls: '',
  value: '',
  itemHeight: 0,
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: 'left',
  mode: '',
  minuteStep: 0,
  use12Hours: false,
  minDate: '',
  maxDate: '',
  minHour: 0,
  maxHour: 0,
  minMinute: 0,
  maxMinute: 0,
  lang: '',
  tillNow: false,
  onValueChange: undefined,
})

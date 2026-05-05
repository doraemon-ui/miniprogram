import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { DatePickerProps, DatePickerExpose } from './types'

export const DatePicker = createHostComponent<DatePickerProps, DatePickerExpose>('dora-date-picker')

DatePicker.displayName = 'DoraDatePicker'

// Props registry for Taro WXML template generator
React.createElement('dora-date-picker', {
  prefixCls: '',
  multiPickerPrefixCls: '',
  pickerPrefixCls: '',
  toolbar: '',
  defaultVisible: false,
  visible: false,
  controlled: false,
  disabled: false,
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
  onVisibleChange: undefined,
  onChange: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onValueChange: undefined,
})

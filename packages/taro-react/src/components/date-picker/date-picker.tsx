import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { DatePickerProps, DatePickerExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const DatePicker = createHostComponent<DatePickerProps, DatePickerExpose>('dora-date-picker',
{
  prefixCls: 'dora-date-picker',
  multiPickerPrefixCls: 'dora-picker',
  pickerPrefixCls: 'dora-picker-view',
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  defaultVisible: false,
  visible: false,
  controlled: false,
  disabled: false,
  value: null,
  itemHeight: 34,
  itemStyle: null,
  indicatorStyle: null,
  indicatorClass: '',
  maskStyle: null,
  maskClass: '',
  labelAlign: 'center',
  mode: 'datetime',
  minuteStep: 1,
  use12Hours: false,
  minDate: null,
  maxDate: null,
  minHour: 0,
  maxHour: 23,
  minMinute: 0,
  maxMinute: 59,
  lang: 'zh_CN',
  tillNow: false,
})

DatePicker.displayName = 'DoraDatePicker'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-date-picker', {
  prefixCls: '',
  multiPickerPrefixCls: '',
  pickerPrefixCls: '',
  toolbar: '',
  defaultVisible: '',
  visible: '',
  controlled: '',
  disabled: '',
  value: '',
  itemHeight: '',
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: '',
  mode: '',
  minuteStep: '',
  use12Hours: '',
  minDate: '',
  maxDate: '',
  minHour: '',
  maxHour: '',
  minMinute: '',
  maxMinute: '',
  lang: '',
  tillNow: '',
  onVisibleChange: '',
  onChange: '',
  onConfirm: '',
  onCancel: '',
  onValueChange: '',
})

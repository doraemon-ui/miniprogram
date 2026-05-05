import { createHostComponent } from '../../hooks/hostComponent'
import type { DatePickerProps, DatePickerExpose } from './types'

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

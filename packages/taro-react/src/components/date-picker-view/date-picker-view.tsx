import { createHostComponent } from '../../hooks/hostComponent'
import type { DatePickerViewProps, DatePickerViewExpose } from './types'

export const DatePickerView = createHostComponent<DatePickerViewProps, DatePickerViewExpose>('dora-date-picker-view',
{
  prefixCls: 'dora-date-picker',
  multiPickerPrefixCls: 'dora-picker',
  pickerPrefixCls: 'dora-picker-view',
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

DatePickerView.displayName = 'DoraDatePickerView'

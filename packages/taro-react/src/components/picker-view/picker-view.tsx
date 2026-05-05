import { createHostComponent } from '../../hooks/hostComponent'
import type { PickerViewProps, PickerViewExpose } from './types'

export const PickerView = createHostComponent<PickerViewProps, PickerViewExpose>('dora-picker-view',
{
  prefixCls: 'dora-picker-view',
  defaultValue: '',
  value: '',
  controlled: false,
  itemHeight: 34,
  itemStyle: null,
  indicatorStyle: null,
  indicatorClass: '',
  maskStyle: null,
  maskClass: '',
  labelAlign: 'center',
  loading: false,
  options: [],
  defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled' },
})

PickerView.displayName = 'DoraPickerView'

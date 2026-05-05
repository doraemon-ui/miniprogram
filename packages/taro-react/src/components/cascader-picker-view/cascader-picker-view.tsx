import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderPickerViewProps, CascaderPickerViewExpose } from './types'

export const CascaderPickerView = createHostComponent<CascaderPickerViewProps, CascaderPickerViewExpose>('dora-cascader-picker-view',
{
  prefixCls: 'dora-picker',
  pickerPrefixCls: 'dora-picker-view',
  value: [],
  cols: 3,
  itemHeight: 34,
  itemStyle: null,
  indicatorStyle: null,
  indicatorClass: '',
  maskStyle: null,
  maskClass: '',
  labelAlign: 'center',
  loading: false,
  options: [],
  defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
})

CascaderPickerView.displayName = 'DoraCascaderPickerView'

import { createHostComponent } from '../../hooks/hostComponent'
import type { PickerProps, PickerExpose } from './types'

export const Picker = createHostComponent<PickerProps, PickerExpose>('dora-picker',
{
  prefixCls: 'dora-popup-picker',
  multiPickerPrefixCls: 'dora-picker',
  pickerPrefixCls: 'dora-picker-view',
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  defaultVisible: false,
  visible: false,
  controlled: false,
  disabled: false,
  cascade: false,
  cols: 3,
  value: [],
  options: [],
  loading: false,
  itemHeight: 34,
  itemStyle: null,
  indicatorStyle: null,
  indicatorClass: '',
  maskStyle: null,
  maskClass: '',
  labelAlign: 'center',
  defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
})

Picker.displayName = 'DoraPicker'

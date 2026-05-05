import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PickerProps, PickerExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-picker', {
  prefixCls: '',
  multiPickerPrefixCls: '',
  pickerPrefixCls: '',
  toolbar: '',
  defaultVisible: '',
  visible: '',
  controlled: '',
  disabled: '',
  cascade: '',
  cols: '',
  value: '',
  options: '',
  loading: '',
  itemHeight: '',
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: '',
  defaultFieldNames: '',
  onVisibleChange: '',
  onChange: '',
  onConfirm: '',
  onCancel: '',
  onValueChange: '',
})

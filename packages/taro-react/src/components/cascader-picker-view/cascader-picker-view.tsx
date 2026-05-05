import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderPickerViewProps, CascaderPickerViewExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader-picker-view', {
  prefixCls: '',
  pickerPrefixCls: '',
  value: '',
  cols: '',
  itemHeight: '',
  itemStyle: '',
  indicatorStyle: '',
  indicatorClass: '',
  maskStyle: '',
  maskClass: '',
  labelAlign: '',
  loading: '',
  options: '',
  defaultFieldNames: '',
  onValueChange: '',
})

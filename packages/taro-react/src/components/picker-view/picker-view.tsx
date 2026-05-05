import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PickerViewProps, PickerViewExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-picker-view', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: '',
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
  onBeforeChange: '',
})

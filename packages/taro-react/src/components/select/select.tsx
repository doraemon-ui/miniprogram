import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SelectProps, SelectExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Select = createHostComponent<SelectProps, SelectExpose>('dora-select',
{
  prefixCls: 'dora-select',
  value: '',
  options: [],
  multiple: false,
  max: -1,
  notFoundContent: { icon: '', title: '', text: '暂无数据' },
  virtualized: false,
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
})

Select.displayName = 'DoraSelect'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-select', {
  prefixCls: '',
  value: '',
  options: '',
  multiple: '',
  max: '',
  notFoundContent: '',
  virtualized: '',
  toolbar: '',
})

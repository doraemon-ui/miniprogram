import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderProps, CascaderExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Cascader = createHostComponent<CascaderProps, CascaderExpose>('dora-cascader',
{
  prefixCls: 'dora-cascader',
  defaultValue: [],
  value: [],
  controlled: false,
  title: '',
  cancelText: '取消',
  confirmText: '确定',
  options: [],
  full: false,
  height: 'auto',
  chooseTitle: '请选择',
  visible: false,
  skipAnimation: false,
  defaultFieldNames: {},
})

Cascader.displayName = 'DoraCascader'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: '',
  title: '',
  cancelText: '',
  confirmText: '',
  options: '',
  full: '',
  height: '',
  chooseTitle: '',
  visible: '',
  skipAnimation: '',
  defaultFieldNames: '',
  onTabsChange: '',
  onLoad: '',
  onChange: '',
  onClose: '',
  onConfirm: '',
  onCancel: '',
})

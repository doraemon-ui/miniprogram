import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderViewProps, CascaderViewExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const CascaderView = createHostComponent<CascaderViewProps, CascaderViewExpose>('dora-cascader-view',
{
  prefixCls: 'dora-cascader-view',
  defaultValue: [],
  value: [],
  controlled: false,
  options: [],
  full: false,
  placeholder: '请选择',
  height: 'auto',
  skipAnimation: false,
  defaultFieldNames: {},
})

CascaderView.displayName = 'DoraCascaderView'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader-view', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: '',
  options: '',
  full: '',
  placeholder: '',
  height: '',
  skipAnimation: '',
  defaultFieldNames: '',
  onTabsChange: '',
  onChange: '',
  onLoad: '',
})

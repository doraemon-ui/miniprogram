import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PopupSelectProps, PopupSelectExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const PopupSelect = createHostComponent<PopupSelectProps, PopupSelectExpose>('dora-popup-select',
{
  prefixCls: 'dora-popup-select',
  classNames: 'dora-animate--fadeIn',
  virtualized: false,
  notFoundContent: { icon: '', title: '', text: '暂无数据' },
  value: '',
  options: [],
  iconPosition: '',
  multiple: false,
  max: -1,
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  visible: false,
  defaultVisible: false,
  controlled: false,
})

PopupSelect.displayName = 'DoraPopupSelect'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popup-select', {
  prefixCls: '',
  classNames: '',
  virtualized: '',
  notFoundContent: '',
  value: '',
  options: '',
  iconPosition: '',
  multiple: '',
  max: '',
  toolbar: '',
  visible: '',
  defaultVisible: '',
  controlled: '',
  onChange: '',
  onClosed: '',
  onCancel: '',
  onValueChange: '',
  onConfirm: '',
})
